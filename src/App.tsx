/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS } from './data/lessons';
import { Lesson, LessonResult, AppSettings, UserStats } from './types';
import { KeyTargetInfo } from './utils/keyboardLayout';
import { soundEngine } from './utils/sound';
import {
  loadSettings,
  saveSettings,
  loadUserStats,
  saveUserStats,
  recordLessonResult,
} from './utils/storage';
import { Keyboard } from './components/Keyboard';
import { HandsGuide } from './components/HandsGuide';
import { TypingStage } from './components/TypingStage';
import { ResultModal } from './components/ResultModal';
import { LessonList } from './components/LessonList';
import { SpeedTestView } from './components/SpeedTestView';
import { CustomPracticeView } from './components/CustomPracticeView';
import { StatsView } from './components/StatsView';
import {
  Volume2,
  VolumeX,
  Keyboard as KeyboardIcon,
  Hand,
  Settings,
  RotateCcw,
  Sun,
  Moon,
  Info,
} from 'lucide-react';

type ActiveTab = 'lessons' | 'speedtest' | 'custom' | 'stats';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);
  const [activeResult, setActiveResult] = useState<LessonResult | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [targetKeyInfo, setTargetKeyInfo] = useState<KeyTargetInfo | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [showQwertzInfo, setShowQwertzInfo] = useState<boolean>(false);

  // Sync sound settings with audio engine
  useEffect(() => {
    soundEngine.setMuted(!settings.soundEnabled);
    soundEngine.setVolume(settings.soundVolume);
    saveSettings(settings);
  }, [settings]);

  // Sync dark class with document element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Metronome tick loop
  useEffect(() => {
    if (!settings.metronomeEnabled) return;
    const intervalMs = (60 / settings.metronomeBpm) * 1000;
    let count = 0;
    const intervalId = window.setInterval(() => {
      count = (count + 1) % 4;
      soundEngine.playMetronomeTick(count === 0);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [settings.metronomeEnabled, settings.metronomeBpm]);

  // Global key tracking for physical keyboard responsiveness
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle lesson completion
  const handleLessonComplete = useCallback((result: LessonResult) => {
    setActiveResult(result);
    setUserStats((prev) => recordLessonResult(prev, result));
  }, []);

  // Advance to next lesson
  const handleNextLesson = () => {
    const currentIndex = LESSONS.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < LESSONS.length - 1) {
      setCurrentLesson(LESSONS[currentIndex + 1]);
      setActiveResult(null);
    } else {
      setActiveResult(null);
    }
  };

  const handleRetryLesson = () => {
    setActiveResult(null);
    setRetryCount((prev) => prev + 1);
  };

  const currentLessonIndex = LESSONS.findIndex((l) => l.id === currentLesson.id);
  const hasNextLesson = currentLessonIndex >= 0 && currentLessonIndex < LESSONS.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Top Bar - Conforming strictly to 3-zone contract */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('lessons');
            }}
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-amber-400 font-mono font-black text-xl">Psač</span>
            <span className="text-slate-400 text-sm font-semibold tracking-normal">QWERTZ</span>
          </a>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single line */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'lessons' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Lekce
            </button>
            <button
              onClick={() => setActiveTab('speedtest')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'speedtest' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Zkouška rychlosti
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'custom' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Vlastní text
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'stats' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Statistiky
            </button>
          </nav>

          {/* Zone 3: 1 primary action / quick toggles */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick sound toggle */}
            <button
              onClick={() =>
                setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
              }
              title={settings.soundEnabled ? 'Zvuk zapnut' : 'Zvuk vypnut'}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Quick Hands Guide toggle */}
            <button
              onClick={() =>
                setSettings((s) => ({ ...s, showHandsGuide: !s.showHandsGuide }))
              }
              title={settings.showHandsGuide ? 'Skrýt ruce' : 'Zobrazit nápovědu rukou'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                settings.showHandsGuide
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
              }`}
            >
              <Hand className="w-4 h-4" />
            </button>

            {/* Settings button */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              title="Nastavení"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-b border-slate-800 bg-slate-900/60 text-xs font-medium px-2 py-2">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'lessons' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Lekce
        </button>
        <button
          onClick={() => setActiveTab('speedtest')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'speedtest' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Zkouška
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'custom' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Vlastní text
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'stats' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Statistiky
        </button>
      </div>

      {/* Settings Drawer Modal */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Předvolby a nastavení</span>
              </h3>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕ Zavřít
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              {/* Virtual Keyboard Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Virtuální klávesnice</div>
                  <div className="text-xs text-slate-400">Zobrazit rozložení kláves na obrazovce</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showVirtualKeyboard}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, showVirtualKeyboard: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 w-4 h-4"
                />
              </div>

              {/* Hands Guide Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Nápověda prstokladu rukou</div>
                  <div className="text-xs text-slate-400">Zvýraznění aktivního prstu na schématu rukou</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showHandsGuide}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, showHandsGuide: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 w-4 h-4"
                />
              </div>

              {/* Metronome */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-200">Metronom pro rytmus</div>
                    <div className="text-xs text-slate-400">Pomáhá udržet rovnoměrné tempo úhozů</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.metronomeEnabled}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, metronomeEnabled: e.target.checked }))
                    }
                    className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 w-4 h-4"
                  />
                </div>
                {settings.metronomeEnabled && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-mono text-slate-400 min-w-[70px]">
                      {settings.metronomeBpm} ú/min
                    </span>
                    <input
                      type="range"
                      min={60}
                      max={260}
                      step={10}
                      value={settings.metronomeBpm}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, metronomeBpm: Number(e.target.value) }))
                      }
                      className="w-full accent-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Stop on Error */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="font-medium text-slate-200">Přísný režim (Stop při chybě)</div>
                  <div className="text-xs text-slate-400">Kurzor postoupí až po stisku správného písmene</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.stopOnError}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, stopOnError: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 w-4 h-4"
                />
              </div>

              {/* Volume Slider */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-slate-200">Hlasitost klapnutí</div>
                  <span className="text-xs font-mono text-slate-400">
                    {Math.round(settings.soundVolume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={settings.soundVolume}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, soundVolume: Number(e.target.value) }))
                  }
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Uložit a zavřít
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Info Banner about Czech QWERTZ Layout */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <span className="font-bold text-white">Specifika české klávesnice QWERTZ & skládání znaků:</span> Písmeno{' '}
              <span className="font-mono text-amber-300 font-bold bg-slate-950 px-1 py-0.2 rounded">Z</span> leží
              v horní řadě vedle T, zatímco písmeno{' '}
              <span className="font-mono text-amber-300 font-bold bg-slate-950 px-1 py-0.2 rounded">Y</span> leží
              v dolní řadě. Znaky jako <span className="font-mono text-amber-300 font-bold bg-slate-950 px-1 py-0.2 rounded">ó</span> a velká písmena s diakritikou (např.{' '}
              <span className="font-mono text-amber-300 font-bold bg-slate-950 px-1 py-0.2 rounded">Č</span>,{' '}
              <span className="font-mono text-amber-300 font-bold bg-slate-950 px-1 py-0.2 rounded">Š</span>) se píší ve 2 krocích pomocí mrtvých kláves (čárka <span className="font-mono text-slate-200">´</span> či háček <span className="font-mono text-slate-200">ˇ</span> vedle Backspace a poté písmeno). Aplikace oba úhozy plně registruje s interaktivním naváděním!
            </div>
          </div>
        </div>

        {/* Tab 1: Structured Lessons View */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            {/* Active Lesson Stage */}
            <div className="space-y-4">
              <TypingStage
                key={`${currentLesson.id}-${retryCount}`}
                text={currentLesson.text}
                lessonId={currentLesson.id}
                title={`${currentLesson.chapterNumber}.${currentLesson.lessonNumber} ${currentLesson.title}`}
                subtitle={currentLesson.subtitle}
                targetCpm={currentLesson.targetCpm}
                stopOnError={settings.stopOnError}
                onComplete={handleLessonComplete}
                onTargetKeyChange={setTargetKeyInfo}
                onKeyPressed={(code) => {
                  setPressedKeys((prev) => {
                    const next = new Set(prev);
                    next.add(code);
                    return next;
                  });
                  setTimeout(() => {
                    setPressedKeys((prev) => {
                      const next = new Set(prev);
                      next.delete(code);
                      return next;
                    });
                  }, 80);
                }}
              />

              {/* Lesson Instructions Callout */}
              <div className="max-w-4xl mx-auto w-full p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-white">Návod k lekci:</span> {currentLesson.explanation}
              </div>
            </div>

            {/* Hands Guide and Keyboard Layout */}
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              {settings.showHandsGuide && (
                <HandsGuide
                  activeFinger={targetKeyInfo?.finger || null}
                  activeHand={targetKeyInfo?.hand || null}
                  needsShift={targetKeyInfo?.needsShift}
                  shiftSide={targetKeyInfo?.shiftSide}
                />
              )}

              {settings.showVirtualKeyboard && (
                <Keyboard
                  targetKeyInfo={targetKeyInfo}
                  pressedKeys={pressedKeys}
                  showFingerColors={true}
                />
              )}
            </div>

            {/* Full Curriculum Roadmap */}
            <div className="pt-6 border-t border-slate-800">
              <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Osnova lekcí české školy psaní
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Postupujte od základních hmatových kláves až k souvislým textům s kompletní diakritikou.
                  </p>
                </div>
              </div>

              <LessonList
                userStats={userStats}
                currentLessonId={currentLesson.id}
                onSelectLesson={(lesson) => {
                  setCurrentLesson(lesson);
                  setActiveResult(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Speed Test View */}
        {activeTab === 'speedtest' && (
          <div className="space-y-6">
            <SpeedTestView
              onComplete={handleLessonComplete}
              onTargetKeyChange={setTargetKeyInfo}
              onKeyPressed={(code) => {
                setPressedKeys((prev) => {
                  const next = new Set(prev);
                  next.add(code);
                  return next;
                });
                setTimeout(() => {
                  setPressedKeys((prev) => {
                    const next = new Set(prev);
                    next.delete(code);
                    return next;
                  });
                }, 80);
              }}
            />

            {settings.showVirtualKeyboard && (
              <div className="pt-4 max-w-4xl mx-auto w-full">
                <Keyboard
                  targetKeyInfo={targetKeyInfo}
                  pressedKeys={pressedKeys}
                  showFingerColors={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Custom Practice View */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            <CustomPracticeView
              onComplete={handleLessonComplete}
              onTargetKeyChange={setTargetKeyInfo}
              onKeyPressed={(code) => {
                setPressedKeys((prev) => {
                  const next = new Set(prev);
                  next.add(code);
                  return next;
                });
                setTimeout(() => {
                  setPressedKeys((prev) => {
                    const next = new Set(prev);
                    next.delete(code);
                    return next;
                  });
                }, 80);
              }}
            />

            {settings.showVirtualKeyboard && (
              <div className="pt-4 max-w-4xl mx-auto w-full">
                <Keyboard
                  targetKeyInfo={targetKeyInfo}
                  pressedKeys={pressedKeys}
                  showFingerColors={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Statistics View */}
        {activeTab === 'stats' && (
          <StatsView
            userStats={userStats}
            onStartWeakKeysDrill={(drillLesson) => {
              setCurrentLesson(drillLesson);
              setActiveTab('lessons');
              setActiveResult(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetStats={() => {
              const fresh: UserStats = {
                completedLessons: {},
                totalTests: 0,
                totalKeystrokes: 0,
                totalTimeMinutes: 0,
                keyStats: {},
                recentResults: [],
                streakDays: 1,
                lastActiveDate: new Date().toISOString().split('T')[0],
              };
              setUserStats(fresh);
              saveUserStats(fresh);
            }}
          />
        )}
      </main>

      {/* Result Modal when lesson completes */}
      {activeResult && (
        <ResultModal
          result={activeResult}
          targetCpm={currentLesson.targetCpm}
          hasNextLesson={hasNextLesson}
          onNextLesson={handleNextLesson}
          onRetry={handleRetryLesson}
          onBackToLessons={() => setActiveResult(null)}
        />
      )}

      {/* Subtle Footer conforming to anti-slop rules (§1.B) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Prstíky</span>
            <span>·</span>
            <span>Česká škola psaní deseti prsty</span>
            <span>·</span>
            <span>Norma ČSN 88 9441</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ÚZM = Úhozy za minutu</span>
            <span>·</span>
            <span>Hmatová metoda</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
