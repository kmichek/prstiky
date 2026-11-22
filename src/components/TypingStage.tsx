import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { LessonResult } from "../types";
import {
  getTargetKeyForChar,
  getStepTargetKeyInfo,
  isDeadKeyEvent,
  composeWithDeadKey,
  KeyTargetInfo,
} from "../utils/keyboardLayout";
import { soundEngine } from "../utils/sound";

interface TypingStageProps {
  text: string;
  lessonId: string;
  title: string;
  subtitle?: string;
  targetCpm?: number;
  timeLimitSeconds?: number; // for timed tests (e.g. 60s, 180s)
  stopOnError?: boolean;
  onComplete: (result: LessonResult) => void;
  onTargetKeyChange?: (info: KeyTargetInfo | null) => void;
  onKeyPressed?: (code: string) => void;
}

export const TypingStage: React.FC<TypingStageProps> = ({
  text,
  lessonId,
  title,
  subtitle,
  targetCpm = 120,
  timeLimitSeconds,
  stopOnError = false,
  onComplete,
  onTargetKeyChange,
  onKeyPressed,
}) => {
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [errorsList, setErrorsList] = useState<boolean[]>([]); // true if mistake at index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [mistakesByKey, setMistakesByKey] = useState<Record<string, number>>(
    {},
  );
  const [currentCpm, setCurrentCpm] = useState<number>(0);
  const [currentWpm, setCurrentWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [remainingTime, setRemainingTime] = useState<number | null>(
    timeLimitSeconds || null,
  );

  // Active dead key buffer (e.g. user pressed acute ´ or caron ˇ and next key will be composed)
  const [pendingDeadKey, setPendingDeadKey] = useState<{
    type: "acute" | "caron" | "ring" | "umlaut";
    display: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef<boolean>(false);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const textScrollRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Current expected character and step-aware target information
  const currentChar = currentIndex < text.length ? text[currentIndex] : "";

  const hasPendingDeadKey = pendingDeadKey !== null;
  const { rawTargetInfo, currentTargetInfo } = useMemo(() => {
    const raw = currentChar ? getTargetKeyForChar(currentChar) : null;
    return {
      rawTargetInfo: raw,
      currentTargetInfo: raw
        ? getStepTargetKeyInfo(raw, hasPendingDeadKey)
        : null,
    };
  }, [currentChar, hasPendingDeadKey]);

  // Notify parent of target key for keyboard and hands guide
  useEffect(() => {
    if (onTargetKeyChange) {
      onTargetKeyChange(currentTargetInfo);
    }
  }, [currentTargetInfo, onTargetKeyChange]);

  // Handle focus automatically and persistently
  useEffect(() => {
    inputRef.current?.focus();
  }, [lessonId]);

  // Keep active character scrolled into comfortable view
  useEffect(() => {
    if (activeCharRef.current && textScrollRef.current) {
      const charEl = activeCharRef.current;
      const scrollEl = textScrollRef.current;
      const charOffset = charEl.offsetTop - scrollEl.offsetTop;
      if (charOffset > 60 || charOffset < 20) {
        scrollEl.scrollTo({
          top: Math.max(0, charEl.offsetTop - 50),
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // Timer loop for real-time speed tracking
  useEffect(() => {
    if (startTime && !isFinished) {
      timerIntervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const seconds = (now - startTime) / 1000;
        setElapsedTime(seconds);

        if (timeLimitSeconds) {
          const left = Math.max(0, timeLimitSeconds - Math.floor(seconds));
          setRemainingTime(left);
          if (left <= 0) {
            finishSession(seconds);
            return;
          }
        }

        // Live CPM (Characters per minute)
        const minutes = seconds / 60;
        if (minutes > 0.01) {
          const grossCpm = Math.round(currentIndex / minutes);
          setCurrentCpm(grossCpm);
          setCurrentWpm(Math.round(grossCpm / 5));
        }

        // Accuracy
        if (totalKeystrokes > 0) {
          const acc = Math.max(
            0,
            Math.round(
              ((totalKeystrokes - totalErrors) / totalKeystrokes) * 100,
            ),
          );
          setAccuracy(acc);
        }
      }, 100);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [
    startTime,
    isFinished,
    currentIndex,
    totalKeystrokes,
    totalErrors,
    timeLimitSeconds,
  ]);

  // Finish session calculation
  const finishSession = useCallback(
    (finalSeconds: number) => {
      if (isFinished) return;
      setIsFinished(true);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

      const safeSeconds = Math.max(1, finalSeconds);
      const minutes = safeSeconds / 60;
      const finalCpm = Math.round(currentIndex / minutes);
      // Net CPM penalizes errors: ČSN standard (hrubé minus 5 úhozů za chybu)
      const netCpm = Math.max(
        0,
        Math.round((currentIndex - totalErrors * 5) / minutes),
      );
      const finalWpm = Math.round(finalCpm / 5);
      const finalAccuracy =
        totalKeystrokes > 0
          ? Math.max(
              0,
              Math.round(
                ((totalKeystrokes - totalErrors) / totalKeystrokes) * 100,
              ),
            )
          : 100;

      // Star calculation
      let stars = 1;
      if (finalCpm >= targetCpm * 0.85 && finalAccuracy >= 92) stars = 2;
      if (finalCpm >= targetCpm && finalAccuracy >= 97) stars = 3;

      soundEngine.playSuccess();

      onComplete({
        lessonId,
        stars,
        cpm: finalCpm,
        netCpm,
        wpm: finalWpm,
        accuracy: finalAccuracy,
        errors: totalErrors,
        totalKeystrokes,
        elapsedSeconds: Math.round(safeSeconds),
        mistakesByKey,
        completedAt: new Date().toISOString(),
      });
    },
    [
      currentIndex,
      totalErrors,
      totalKeystrokes,
      targetCpm,
      lessonId,
      mistakesByKey,
      isFinished,
      onComplete,
    ],
  );

  // Ref to avoid duplicate processing in edge cases
  const lastProcessedRef = useRef<{ char: string; time: number }>({
    char: "",
    time: 0,
  });

  // Core character processor: accepts single committed character
  const processChar = useCallback(
    (actual: string) => {
      if (isFinished || currentIndex >= text.length) return;

      // Start timer on first printable keystroke
      let activeStart = startTime;
      if (!activeStart) {
        activeStart = Date.now();
        setStartTime(activeStart);
      }

      const expected = text[currentIndex];
      setTotalKeystrokes((prev) => prev + 1);

      // Matching condition with smart case tolerance:
      // If the expected char is a Czech accented letter (like ď, ť, ň, ó, č, š, ž, ř, ě, á, é, í, ú, ů),
      // and the user typed the uppercase version (e.g. Ď, Ť, Ň, Ó) because Shift was still held from the dead key,
      // count it as correct!
      const isExactMatch = actual === expected;
      const isAccentedToleranceMatch =
        expected !== expected.toUpperCase() && // expected is lowercase
        actual.toLowerCase() === expected.toLowerCase() && // same letter
        "ďťňóčšžřěáéíúů".includes(expected.toLowerCase()); // it's a Czech accented letter

      const isMatch = isExactMatch || isAccentedToleranceMatch;

      if (isMatch) {
        // Correct strike
        soundEngine.playKeyClick(expected === " ");
        setTypedChars((prev) => [...prev, expected]);
        setErrorsList((prev) => [...prev, false]);

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex >= text.length) {
          const finalSecs = (Date.now() - (activeStart || Date.now())) / 1000;
          finishSession(finalSecs);
        }
      } else {
        // Error strike
        soundEngine.playError();
        setTotalErrors((prev) => prev + 1);
        setMistakesByKey((prev) => ({
          ...prev,
          [expected]: (prev[expected] || 0) + 1,
        }));

        if (stopOnError) {
          // Mode: user must hit the correct key before cursor advances
        } else {
          // Fluid mode: advance with error recorded
          setTypedChars((prev) => [...prev, actual]);
          setErrorsList((prev) => [...prev, true]);
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);

          if (nextIndex >= text.length) {
            const finalSecs = (Date.now() - (activeStart || Date.now())) / 1000;
            finishSession(finalSecs);
          }
        }
      }
    },
    [currentIndex, finishSession, isFinished, startTime, stopOnError, text],
  );

  const handleIncomingChar = useCallback(
    (char: string) => {
      if (!char) return;
      const now = Date.now();
      // Drop immediate duplicates within 35ms
      if (
        now - lastProcessedRef.current.time < 35 &&
        char === lastProcessedRef.current.char
      ) {
        return;
      }
      lastProcessedRef.current = { char, time: now };
      processChar(char);
    },
    [processChar],
  );

  // Keydown handler: Only handles physical keyboard animation, Backspace, Escape, and dead key flags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;

    // Pass code to parent for physical keyboard ripple animation
    if (onKeyPressed) {
      onKeyPressed(e.code);
    }

    // Backspace handling
    if (e.key === "Backspace") {
      e.preventDefault();
      // If a dead key was pending, cancel the dead key first without deleting previously typed text
      if (pendingDeadKey) {
        setPendingDeadKey(null);
        soundEngine.playKeyClick(false);
        return;
      }
      if (currentIndex > 0) {
        soundEngine.playKeyClick(false);
        setCurrentIndex((prev) => prev - 1);
        setTypedChars((prev) => prev.slice(0, -1));
        setErrorsList((prev) => prev.slice(0, -1));
      }
      return;
    }

    // Escape handling: cancel pending dead key
    if (e.key === "Escape") {
      if (pendingDeadKey) {
        e.preventDefault();
        setPendingDeadKey(null);
        return;
      }
    }

    // Check if this keystroke is a dead key (čárka ´, háček ˇ, kroužek °, přehláska ¨)
    const detectedDeadKey = isDeadKeyEvent(
      {
        key: e.key,
        code: e.code,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      },
      text[currentIndex],
    );

    if (detectedDeadKey) {
      soundEngine.playKeyClick(false);
      setPendingDeadKey({
        type: detectedDeadKey,
        display:
          detectedDeadKey === "caron"
            ? "ˇ"
            : detectedDeadKey === "ring"
              ? "°"
              : detectedDeadKey === "umlaut"
                ? "¨"
                : "´",
      });
      // Do NOT prevent default on e.key === 'Dead' or on macOS dead keys, so the browser IME can naturally buffer it!
      // Only preventDefault if it would insert a visible standalone character like `´` or `'` when unwanted
      if (
        e.key === "'" ||
        e.key === "´" ||
        e.key === "ˇ" ||
        e.key === "°" ||
        e.key === "¨"
      ) {
        e.preventDefault();
      }
      return;
    }

    // Note: We do NOT call e.preventDefault() on regular keys.
    // Instead, we let the browser naturally type into the input element,
    // which triggers onChange with the correctly composed character (e.g. macOS native dead keys),
    // or beforeInput / compositionend.
  };

  // Native input event: this receives the finalized character from the OS
  // regardless of how many keystrokes, dead keys, or modifier keys were used!
  const justComposedRef = useRef<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Wait until OS/browser dead-key composition finishes
    if (isComposingRef.current) return;

    const val = e.target.value;
    e.target.value = "";
    if (!val || isFinished || currentIndex >= text.length) return;

    for (let i = 0; i < val.length; i++) {
      const ch = val[i];

      // Standalone dead key character typed into the input
      if (ch === "ˇ" || ch === "´" || ch === "°" || ch === "¨" || ch === "'") {
        const type =
          ch === "ˇ"
            ? "caron"
            : ch === "°"
              ? "ring"
              : ch === "¨"
                ? "umlaut"
                : "acute";
        soundEngine.playKeyClick(false);
        setPendingDeadKey({ type, display: ch });
        continue;
      }

      if (pendingDeadKey) {
        const deadType = pendingDeadKey.type;
        setPendingDeadKey(null);
        const expected = text[currentIndex] || "";
        // If the OS already composed 'ň', composeWithDeadKey('caron', 'ň') returns null,
        // so `|| ch` uses 'ň' directly!
        const composed = composeWithDeadKey(deadType, ch) || ch;

        if (
          expected &&
          expected === expected.toUpperCase() &&
          expected !== expected.toLowerCase() &&
          composed.toUpperCase() === expected
        ) {
          handleIncomingChar(expected);
        } else {
          handleIncomingChar(composed);
        }
      } else {
        handleIncomingChar(ch);
      }
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    isComposingRef.current = false;
    const activeDeadType = pendingDeadKey?.type;
    setPendingDeadKey(null);
    const fallbackData = e.data;

    queueMicrotask(() => {
      const el = inputRef.current;
      if (!el || isFinished || currentIndex >= text.length) return;

      const raw = el.value || fallbackData || "";
      el.value = "";
      if (!raw) return;

      for (const ch of raw) {
        const composed = activeDeadType
          ? composeWithDeadKey(activeDeadType, ch) || ch
          : ch;
        handleIncomingChar(composed);
      }
    });
  };

  const progressPct = Math.min(
    100,
    Math.round((currentIndex / text.length) * 100),
  );

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-4xl mx-auto flex flex-col focus:outline-none cursor-text select-none"
    >
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-xl bg-slate-900/70 border border-slate-800/90 mb-4 backdrop-blur-sm select-none">
        {/* Lesson Title & Target */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white tracking-tight">
              {title}
            </span>
            {subtitle && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                · {subtitle}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            <span>
              Cíl:{" "}
              <span className="text-amber-400 font-mono font-medium">
                {targetCpm} úhozů/min
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Postup:{" "}
              <span className="font-mono text-slate-300">
                {currentIndex}/{text.length}
              </span>
            </span>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* CPM */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Úhozy/min
            </span>
            <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {currentCpm}
            </span>
          </div>

          {/* WPM */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Slov/min
            </span>
            <span className="text-xl font-bold font-mono text-sky-400 tabular-nums">
              {currentWpm}
            </span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Přesnost
            </span>
            <span
              className={`text-xl font-bold font-mono tabular-nums ${accuracy >= 95 ? "text-emerald-400" : accuracy >= 88 ? "text-amber-400" : "text-rose-400"}`}
            >
              {accuracy}%
            </span>
          </div>

          {/* Time or Countdown */}
          <div className="flex flex-col items-end min-w-[50px]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              {timeLimitSeconds ? "Zbývá" : "Čas"}
            </span>
            <span className="text-xl font-bold font-mono text-slate-200 tabular-nums">
              {timeLimitSeconds && remainingTime !== null
                ? `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, "0")}`
                : `${Math.floor(elapsedTime / 60)}:${Math.floor(
                    elapsedTime % 60,
                  )
                    .toString()
                    .padStart(2, "0")}`}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4 select-none">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-150 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Text display canvas */}
      <div
        ref={textScrollRef}
        onClick={() => inputRef.current?.focus()}
        className="relative min-h-[140px] max-h-[180px] overflow-y-auto p-6 rounded-xl bg-slate-900/95 border border-slate-800 shadow-inner font-mono text-xl sm:text-2xl leading-relaxed tracking-wide select-none transition-colors cursor-text"
      >
        {/* Native input overlay for flawless OS dead keys, IME, and keystrokes value="" */}
        <input
          ref={inputRef}
          type="text"
          defaultValue=""
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text pointer-events-auto z-10"
          aria-label="Psací plocha"
        />
        {text.split("").map((char, index) => {
          const isTyped = index < currentIndex;
          const isCurrent = index === currentIndex;
          const hasError = errorsList[index];

          if (isTyped) {
            return (
              <span
                key={index}
                className={
                  hasError
                    ? "text-rose-400 underline decoration-rose-500 decoration-2 bg-rose-500/10"
                    : "text-emerald-400"
                }
              >
                {char}
              </span>
            );
          }

          if (isCurrent) {
            return (
              <span
                key={index}
                ref={activeCharRef}
                className="relative inline-block text-white font-bold bg-amber-500/30 rounded px-0.5 border-b-2 border-amber-400 shadow-sm shadow-amber-500/30 animate-pulse"
              >
                {char === " " ? "␣" : char}
              </span>
            );
          }

          return (
            <span key={index} className="text-slate-500">
              {char}
            </span>
          );
        })}

        {/* Start typing prompt when not started */}
        {!startTime && (
          <div className="absolute right-4 bottom-3 text-xs font-sans text-slate-400 bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800 pointer-events-none">
            Začněte psát libovolnou klávesou...
          </div>
        )}
      </div>

      {/* Active Dead Key Status Banner (when user presses acute, caron, etc.) */}
      {pendingDeadKey && (
        <div className="mt-2.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-400/60 flex items-center justify-between text-xs text-amber-200 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">
              Mrtvá klávesa v paměti:
            </span>
            <span className="font-mono text-sm px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black">
              {pendingDeadKey.display} (
              {pendingDeadKey.type === "caron"
                ? "Háček"
                : pendingDeadKey.type === "ring"
                  ? "Kroužek"
                  : pendingDeadKey.type === "umlaut"
                    ? "Přehláska"
                    : "Čárka"}
              )
            </span>
            <span>
              → Nyní stiskněte písmeno (např.{" "}
              {rawTargetInfo?.baseChar || currentChar})
            </span>
          </div>
          <span className="text-[11px] text-amber-300/80 hidden sm:inline">
            Stiskem Backspace zrušíte
          </span>
        </div>
      )}

      {/* Real-time Czech character helper hint */}
      {currentTargetInfo && (
        <div className="mt-2.5 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 bg-slate-900/40 rounded-lg border border-slate-800/60 select-none">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-300">Aktuální znak:</span>
            <span className="font-mono text-sm px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded font-bold">
              {currentChar === " " ? "Mezera" : currentChar}
            </span>
            <span className="text-slate-400">→</span>
            <span className="text-slate-300">
              {currentTargetInfo.instructionCs}
            </span>
          </div>

          {currentTargetInfo.isDeadKeySequence && (
            <span className="text-[11px] text-amber-400 font-medium px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/30">
              {currentTargetInfo.step === 2
                ? "Krok 2/2: Stisk písmene"
                : "Krok 1/2: Mrtvá klávesa"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
