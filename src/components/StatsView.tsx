/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserStats, Lesson } from '../types';
import { Award, Zap, Target, Flame, RotateCcw, Dumbbell, History } from 'lucide-react';

interface StatsViewProps {
  userStats: UserStats;
  onStartWeakKeysDrill: (drillLesson: Lesson) => void;
  onResetStats: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  userStats,
  onStartWeakKeysDrill,
  onResetStats,
}) => {
  const completedCount = Object.keys(userStats.completedLessons).length;

  // Best CPM
  const allResults = [
    ...Object.values(userStats.completedLessons),
    ...userStats.recentResults,
  ];

  const bestCpm = allResults.length > 0
    ? Math.max(...allResults.map((r) => r.cpm))
    : 0;

  const avgAccuracy = allResults.length > 0
    ? Math.round(
        allResults.reduce((acc, curr) => acc + curr.accuracy, 0) /
          allResults.length
      )
    : 100;

  // Weak keys calculation
  const weakKeysEntries = Object.entries(userStats.keyStats)
    .filter(([_, stats]) => stats.errors > 0)
    .sort((a, b) => b[1].errors - a[1].errors)
    .slice(0, 10);

  // Generate weak keys drill
  const handleGenerateWeakKeysDrill = () => {
    if (weakKeysEntries.length === 0) return;
    const topKeys = weakKeysEntries.slice(0, 5).map(([char]) => char);

    // Create drill text repeating these weak characters in patterns
    const words: string[] = [];
    for (let i = 0; i < 20; i++) {
      const k1 = topKeys[Math.floor(Math.random() * topKeys.length)];
      const k2 = topKeys[Math.floor(Math.random() * topKeys.length)];
      const k3 = topKeys[Math.floor(Math.random() * topKeys.length)];
      words.push(`${k1}${k2}${k3}`);
    }

    const drillText = words.join(' ');

    const drillLesson: Lesson = {
      id: 'weak-keys-drill',
      chapterId: 'chapter-weak',
      chapterTitle: 'Trénink slabých kláves',
      chapterNumber: 99,
      lessonNumber: 1,
      title: 'Adaptivní trénink problematických kláves',
      subtitle: `Soustředění na: ${topKeys.join(', ')}`,
      targetCpm: 120,
      newKeys: topKeys,
      fingerFocus: 'Problematické znaky',
      explanation: `Tento trénink je automaticky sestaven z kláves, u kterých jste udělali nejvíce chyb: ${topKeys.join(', ')}. Nespěchejte a dbejte na správný prstoklad.`,
      text: drillText,
    };

    onStartWeakKeysDrill(drillLesson);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Rekord úhozů</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {bestCpm}
            </div>
            <div className="text-[11px] text-slate-400">úhozů za minutu</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Průměrná přesnost</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {avgAccuracy}%
            </div>
            <div className="text-[11px] text-slate-400">ze všech cvičení</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Dokončené lekce</span>
            <Award className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
              {completedCount}
            </div>
            <div className="text-[11px] text-slate-400">z 23 lekcí osnovy</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Aktivní série</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-rose-400 tabular-nums">
              {userStats.streakDays || 1}
            </div>
            <div className="text-[11px] text-slate-400">
              {userStats.streakDays === 1 ? 'den v řadě' : 'dní v řadě'}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Keys Heatmap and Drill */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-amber-400" />
              <span>Chybovost podle kláves</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Přehled znaků, u kterých došlo k nejvíce chybám.
            </p>
          </div>

          {weakKeysEntries.length > 0 && (
            <button
              onClick={handleGenerateWeakKeysDrill}
              className="py-2 px-3.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Spustit trénink slabých kláves</span>
            </button>
          )}
        </div>

        {weakKeysEntries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {weakKeysEntries.map(([char, stats]) => {
              const errPct = stats.hits > 0 ? Math.round((stats.errors / stats.hits) * 100) : 100;
              return (
                <div
                  key={char}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-lg text-amber-300">
                    {char === ' ' ? '␣' : char}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-rose-400">
                      {stats.errors}× chyba
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {errPct}% chybovost
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            Zatím nemáte zaznamenány žádné chyby. Skvělá práce!
          </div>
        )}
      </div>

      {/* Recent history */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-slate-400" />
          <span>Nedávné výsledky</span>
        </h3>

        {userStats.recentResults.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {userStats.recentResults.slice(-5).reverse().map((result, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">
                    {new Date(result.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="font-medium text-slate-200">
                    {result.lessonId.startsWith('speedtest') ? 'Zkouška rychlosti' : 'Lekce'}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="text-amber-400 font-bold">{result.cpm} úhozů/min</span>
                  <span className="text-emerald-400">{result.accuracy}%</span>
                  <span className="text-slate-400">{result.elapsedSeconds}s</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            Zatím žádná historie. Dokončete svou první lekci!
          </div>
        )}
      </div>

      {/* Reset stats option */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            if (confirm('Opravdu chcete resetovat všechny své statistiky a postup?')) {
              onResetStats();
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetovat statistiky</span>
        </button>
      </div>
    </div>
  );
};
