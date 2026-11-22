/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LessonResult } from '../types';
import { Star, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ResultModalProps {
  result: LessonResult;
  targetCpm: number;
  hasNextLesson: boolean;
  onNextLesson: () => void;
  onRetry: () => void;
  onBackToLessons: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  targetCpm,
  hasNextLesson,
  onNextLesson,
  onRetry,
  onBackToLessons,
}) => {
  useEffect(() => {
    // Launch celebratory confetti if completed with good performance
    if (result.accuracy >= 90) {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#fb7185'],
      });
    }

    // Keyboard shortcuts
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasNextLesson) {
        onNextLesson();
      } else if (e.key === 'r' || e.key === 'R') {
        onRetry();
      } else if (e.key === 'Escape') {
        onBackToLessons();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [result, hasNextLesson, onNextLesson, onRetry, onBackToLessons]);

  const mistakesEntries = Object.entries(result.mistakesByKey).sort((a, b) => b[1] - a[1]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Star Rating Banner */}
        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              className={`w-9 h-9 transition-all ${
                starIndex <= result.stars
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] scale-110'
                  : 'text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Title feedback */}
        <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
          {result.stars === 3
            ? 'Vynikající výkon!'
            : result.stars === 2
            ? 'Skvělá práce!'
            : 'Lekce dokončena'}
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {result.cpm >= targetCpm
            ? `Překonali jste cílovou rychlost ${targetCpm} úhozů/min!`
            : `Cílem bylo dosáhnout ${targetCpm} úhozů/min. Tréninkem se brzy zrychlíte.`}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-6">
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Hrubé úhozy</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
              {result.cpm}
            </span>
            <span className="text-[10px] text-slate-400">úhozů/min</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Čistá rychlost</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
              {result.netCpm}
            </span>
            <span className="text-[10px] text-slate-400">ČSN penalizace</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Přesnost</span>
            <span className={`text-2xl font-bold font-mono mt-1 tabular-nums ${
              result.accuracy >= 95 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {result.accuracy}%
            </span>
            <span className="text-[10px] text-slate-400">
              {result.errors} {result.errors === 1 ? 'chyba' : result.errors < 5 ? 'chyby' : 'chyb'}
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Čas psaní</span>
            <span className="text-2xl font-bold font-mono text-sky-400 mt-1 tabular-nums">
              {result.elapsedSeconds}s
            </span>
            <span className="text-[10px] text-slate-400">{result.wpm} slov/min</span>
          </div>
        </div>

        {/* Problematic keys analysis */}
        {mistakesEntries.length > 0 && (
          <div className="w-full p-3.5 mb-6 rounded-xl bg-rose-950/20 border border-rose-900/40 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-300 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Klávesy vyžadující více pozornosti:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mistakesEntries.slice(0, 6).map(([char, count]) => (
                <span
                  key={char}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-rose-800/60 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                >
                  <span className="font-bold text-amber-300">{char === ' ' ? 'Mezera' : char}</span>
                  <span className="text-[10px] text-rose-400 font-sans">({count}× chyba)</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onRetry}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Opakovat (R)</span>
          </button>

          {hasNextLesson ? (
            <button
              onClick={onNextLesson}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Další lekce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToLessons}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Přehled lekcí</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
