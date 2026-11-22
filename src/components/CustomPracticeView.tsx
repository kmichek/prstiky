/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TypingStage } from './TypingStage';
import { LessonResult } from '../types';
import { KeyTargetInfo } from '../utils/keyboardLayout';
import { Edit3, Sparkles, Play } from 'lucide-react';

interface CustomPracticeViewProps {
  onComplete: (result: LessonResult) => void;
  onTargetKeyChange?: (info: KeyTargetInfo | null) => void;
  onKeyPressed?: (code: string) => void;
}

const PRESET_DRILLS = [
  {
    title: 'Duel Z vs Y v QWERTZ',
    text: 'jazyk brzy rýže zvyk výzva ozvy zatykač zbylo zpytovat zbytek fyzika vzácný záhyb zrychlit vyznání zpytovat zmatek zvyklost',
  },
  {
    title: 'Česká diakritika (všechny háčky a čárky)',
    text: 'příliš žluťoučký kůň úpěl ďábelské ódy. šťastný den přinesl déšť a stříbrný měsíc ozářil tichou říční zátoku.',
  },
  {
    title: 'Kombinace ú vs ů',
    text: 'úkol dům stůl kůlna úprk útes úsvit růže kůň půda úpatí úředník úvaha průvod vůle kůra úbytek průzkum',
  },
  {
    title: 'Měkké a tvrdé souhlásky s háčky',
    text: 'černý klobouk ležel na židli u šatny. řeka tiše šuměla a v rákosí se schovávala divoká kachna se svými mláďaty.',
  },
];

export const CustomPracticeView: React.FC<CustomPracticeViewProps> = ({
  onComplete,
  onTargetKeyChange,
  onKeyPressed,
}) => {
  const [customText, setCustomText] = useState(
    'Česká klávesnice QWERTZ nabízí pohodlné psaní všech znaků s diakritikou přímo v horní řadě.'
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    if (customText.trim().length >= 5) {
      setIsPlaying(true);
    }
  };

  const handleFinish = (result: LessonResult) => {
    setIsPlaying(false);
    onComplete(result);
  };

  if (isPlaying) {
    return (
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between max-w-4xl mx-auto px-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-amber-400 font-mono">VLASTNÍ TRÉNINK</span>
            <span>·</span>
            <span>{customText.slice(0, 35)}...</span>
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            Ukončit trénink
          </button>
        </div>

        <TypingStage
          text={customText.trim()}
          lessonId="custom-drill"
          title="Vlastní text"
          subtitle="Vlastní tréninková lekce"
          targetCpm={130}
          stopOnError={false}
          onComplete={handleFinish}
          onTargetKeyChange={onTargetKeyChange}
          onKeyPressed={onKeyPressed}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Intro */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Trénink vlastního textu
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Vložte libovolný český text, pracovní poznámky, nebo si vyberte ze specializovaných předpřipravených cvičení na obtížné české jevy.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Drills */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Doporučená tematická cvičení:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRESET_DRILLS.map((preset, i) => (
            <button
              key={i}
              onClick={() => setCustomText(preset.text)}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850/60 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-400 font-mono truncate mt-1">
                {preset.text}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">
            Zadejte nebo vložte text (minimálně 5 znaků):
          </label>
          <span className="text-xs font-mono text-slate-400">
            {customText.length} znaků
          </span>
        </div>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          rows={5}
          className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-200 font-mono text-sm leading-relaxed transition-colors resize-y"
          placeholder="Vložte text pro nácvik..."
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleStart}
          disabled={customText.trim().length < 5}
          className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-base transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>Spustit cvičení</span>
        </button>
      </div>
    </div>
  );
};
