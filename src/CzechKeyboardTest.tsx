import React, { useState } from "react";
import { TypingStage } from "./components/TypingStage";
import { Keyboard } from "./components/Keyboard";
import { KeyTargetInfo } from "./utils/keyboardLayout";

const CZECH_TEST_SETS = [
  {
    id: "dead-keys-lower",
    title: "Test 1: Háčky a čárky přes mrtvou klávesu (malá)",
    text: "kůň ďábel ťukat ňafnout óda",
  },
  {
    id: "dead-keys-upper",
    title: "Test 2: Velká písmena s diakritikou (Caps/mrtvá klávesa)",
    text: "Čáp Šárka Žába Řeka Ě Ďábel Ťapka Ňuf Óda Úl Ůl",
  },
  {
    id: "full-czech-pangram",
    title: "Test 3: Kompletní česká abeceda (pangram)",
    text: "Příliš žluťoučký kůň úpěl ďábelské ódy. PŘÍLIŠ ŽLUŤOUČKÝ KŮŇ ÚPĚL ĎÁBELSKÉ ÓDY.",
  },
];

export const CzechKeyboardTest: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [targetKeyInfo, setTargetKeyInfo] = useState<KeyTargetInfo | null>(
    null,
  );
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastEventLog, setLastEventLog] = useState<string>(
    "Čekám na stisk klávesy...",
  );
  const [resetKey, setResetKey] = useState(0);

  const currentSet = CZECH_TEST_SETS[selectedIdx];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {CZECH_TEST_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => {
                setSelectedIdx(idx);
                setResetKey((k) => k + 1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedIdx === idx
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {set.title}
            </button>
          ))}
        </div>

        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-amber-400 border border-slate-700 cursor-pointer"
        >
          Resetovat test
        </button>
      </div>

      {/* Live event inspector so you can see exactly what browser/macOS sends */}
      <div
        onKeyDownCapture={(e) =>
          setLastEventLog(
            `key="${e.key}" | code="${e.code}" | shift=${e.shiftKey} | alt=${e.altKey}`,
          )
        }
        className="space-y-4"
      >
        <div className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-400">
          Poslední KeyDown: {lastEventLog}
        </div>

        <TypingStage
          key={`${currentSet.id}-${resetKey}`}
          text={currentSet.text}
          lessonId={currentSet.id}
          title={currentSet.title}
          stopOnError={true}
          onComplete={(res) =>
            alert(`Hotovo! Přesnost: ${res.accuracy}%, Chyby: ${res.errors}`)
          }
          onTargetKeyChange={setTargetKeyInfo}
          onKeyPressed={(code) => {
            setPressedKeys((prev) => new Set(prev).add(code));
            setTimeout(() => {
              setPressedKeys((prev) => {
                const next = new Set(prev);
                next.delete(code);
                return next;
              });
            }, 100);
          }}
        />
      </div>

      <Keyboard
        targetKeyInfo={targetKeyInfo}
        pressedKeys={pressedKeys}
        showFingerColors={true}
      />
    </div>
  );
};
