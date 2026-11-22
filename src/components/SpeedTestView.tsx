/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TypingStage } from './TypingStage';
import { LessonResult } from '../types';
import { KeyTargetInfo } from '../utils/keyboardLayout';
import { Award, Timer, BookOpen } from 'lucide-react';

interface SpeedTestViewProps {
  onComplete: (result: LessonResult) => void;
  onTargetKeyChange?: (info: KeyTargetInfo | null) => void;
  onKeyPressed?: (code: string) => void;
}

const TEST_TEXTS = [
  {
    id: 'capek-rur',
    title: 'Karel Čapek: R.U.R.',
    duration: 60, // 1 min
    text: 'Člověk je stroj, který příliš mnoho stojí. Je nutno vyrobit člověka levnějšího a spolehlivějšího. Starý Rossum chtěl vědecky dokázat, že Bůh je zbytečný. Mladý inženýr Rossum však pochopil praktický význam: vyřadil všechno, co neslouží práci, a tak vznikl Robot. Dělník, který má všechny lidské schopnosti, ale postrádá duši, pocity i únavu.',
  },
  {
    id: 'capek-mloci',
    title: 'Karel Čapek: Válka s mloky',
    duration: 120, // 2 min
    text: 'Kapitán van Toch stál na palubě své staré lodi a díval se na tiché vody tichomořské zátoky. Domorodci se báli čertů, kteří žijí pod útesy a vydávají podivné zvuky. Kapitán se však nebál; vzal si starý nůž a potápěčskou kuklu a sestoupil pod hladinu. Tam spatřil tvory podobné ještěrkám, kteří dovedli používat kamenné nástroje a otevírat perlorodky.',
  },
  {
    id: 'neruda-malostranske',
    title: 'Jan Neruda: Povídky malostranské',
    duration: 180, // 3 min
    text: 'V Praze na Malé Straně plynul čas docela jinak než ve zbytku velkého světa. Ranní slunce osvětlovalo střechy starobylých paláců a zvon z chrámu svatého Mikuláše odbíjel hodiny s důstojnou vážností. Lidé se zde všichni znali jménem, věděli o každém kroku svého souseda a po večerech usedali k besedám u džbánku piva.',
  },
  {
    id: 'statni-zkouska',
    title: 'Státní zkouška ze psaní (ČSN 88 9441)',
    duration: 300, // 5 min
    text: 'Schopnost psát všemi deseti prsty hmatovou metodou představuje základní předpoklad moderní administrativní a kancelářské práce. Norma ČSN 88 9441 stanovuje přesná pravidla pro posuzování rychlosti a přesnosti. Za každou neopravenou chybu se odečítá stanovený počet trestných úhozů. Cílem je dosáhnout vyrovnaného rytmu, kdy prsty nacházejí klávesy automaticky bez zrakové kontroly. Tím se šetří nejen zrak a krční páteř, ale především se uvolňuje mozková kapacita pro samotné tvůrčí myšlení a formulaci textu.',
  },
];

export const SpeedTestView: React.FC<SpeedTestViewProps> = ({
  onComplete,
  onTargetKeyChange,
  onKeyPressed,
}) => {
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const [testInProgress, setTestInProgress] = useState(false);

  const currentTest = TEST_TEXTS[selectedTextIndex];

  const handleStart = () => {
    setTestInProgress(true);
  };

  const handleFinish = (result: LessonResult) => {
    setTestInProgress(false);
    onComplete(result);
  };

  if (testInProgress) {
    return (
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between max-w-4xl mx-auto px-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-amber-400 font-mono">ČASOVKA</span>
            <span>·</span>
            <span>{currentTest.title}</span>
          </div>
          <button
            onClick={() => setTestInProgress(false)}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            Přerušit test
          </button>
        </div>

        <TypingStage
          key={`test-${currentTest.id}`}
          text={currentTest.text}
          lessonId={`speedtest-${currentTest.id}`}
          title={currentTest.title}
          subtitle={`Časový limit: ${currentTest.duration}s`}
          targetCpm={200}
          timeLimitSeconds={currentTest.duration}
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
      {/* Intro Hero banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Zkouška rychlosti psaní (ČSN 88 9441)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Ověřte si své reálné tempo psaní na souvislých textech české klasiky. Výpočet čisté rychlosti zohledňuje penalizaci 5 až 10 úhozů za každou chybu, přesně jako u státní zkoušky ze psaní na klávesnici.
            </p>
          </div>
        </div>
      </div>

      {/* Select Test Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {TEST_TEXTS.map((test, idx) => {
          const isSelected = selectedTextIndex === idx;
          const mins = Math.floor(test.duration / 60);

          return (
            <div
              key={test.id}
              onClick={() => setSelectedTextIndex(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>{test.title}</span>
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    <Timer className="w-3 h-3" />
                    {mins === 1 ? '1 minuta' : mins < 5 ? `${mins} minuty` : `${mins} minut`}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 font-mono leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
                  {test.text}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Délka: {test.text.length} znaků</span>
                <span className={isSelected ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                  {isSelected ? 'Vybráno ke spuštění' : 'Klikněte pro výběr'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleStart}
          className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          <Timer className="w-5 h-5" />
          <span>Zahájit zkoušku ({Math.floor(currentTest.duration / 60)} min)</span>
        </button>
      </div>
    </div>
  );
};
