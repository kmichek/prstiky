/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KeyDefinition, FingerType } from '../types';
import { CZECH_QWERTZ_ROWS, FINGER_COLORS, KeyTargetInfo } from '../utils/keyboardLayout';

interface KeyboardProps {
  targetKeyInfo: KeyTargetInfo | null;
  pressedKeys: Set<string>;
  showFingerColors?: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  targetKeyInfo,
  pressedKeys,
  showFingerColors = true,
}) => {
  const isKeyTarget = (key: KeyDefinition) => {
    if (!targetKeyInfo) return false;
    if (key.code === targetKeyInfo.code) return true;
    if (targetKeyInfo.needsShift) {
      if (targetKeyInfo.shiftSide === 'left' && key.code === 'ShiftLeft') return true;
      if (targetKeyInfo.shiftSide === 'right' && key.code === 'ShiftRight') return true;
      if (!targetKeyInfo.shiftSide && (key.code === 'ShiftLeft' || key.code === 'ShiftRight')) return true;
    }
    return false;
  };

  const isSecondarySequenceKey = (key: KeyDefinition) => {
    if (!targetKeyInfo || !targetKeyInfo.isDeadKeySequence) return false;
    // When on step 1 (dead key), show base key as step 2 with subtle dashed indicator
    if (targetKeyInfo.step === 1 && key.code === targetKeyInfo.baseCode) {
      return true;
    }
    return false;
  };

  const getFingerIndicatorClass = (
    finger: FingerType,
    isTarget: boolean,
    isPressed: boolean,
    isSecondary: boolean
  ) => {
    if (isPressed) {
      return 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 scale-95';
    }

    if (isTarget) {
      return 'ring-2 ring-amber-400 bg-amber-500/25 border-amber-400 text-white font-bold shadow-lg shadow-amber-500/20 animate-pulse';
    }

    if (isSecondary) {
      return 'border border-dashed border-amber-400/60 bg-amber-400/5 text-amber-200/90';
    }

    if (!showFingerColors) {
      return 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700';
    }

    // Default resting key style with subtle finger dot or border
    return 'bg-slate-900/95 text-slate-200 border-slate-800 hover:border-slate-700';
  };

  const getFingerBarColor = (finger: FingerType) => {
    switch (finger) {
      case 'left-pinky': return 'bg-rose-500';
      case 'left-ring': return 'bg-amber-500';
      case 'left-middle': return 'bg-emerald-500';
      case 'left-index': return 'bg-sky-500';
      case 'thumb': return 'bg-indigo-500';
      case 'right-index': return 'bg-teal-500';
      case 'right-middle': return 'bg-emerald-500';
      case 'right-ring': return 'bg-amber-500';
      case 'right-pinky': return 'bg-purple-500';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 md:p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-sm select-none">
      {/* Keyboard Header / Badge */}
      <div className="flex items-center justify-between mb-2.5 px-1 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-slate-300 font-mono text-[11px]">ČESKÁ QWERTZ</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-[11px]">
            {targetKeyInfo ? targetKeyInfo.instructionCs : 'Připraveno ke psaní'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span> Z nahoře
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Y dole
          </span>
        </div>
      </div>

      {/* Physical Keys Grid */}
      <div className="flex flex-col gap-1.5 md:gap-2">
        {CZECH_QWERTZ_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1 md:gap-1.5 justify-center w-full">
            {row.map((key) => {
              const target = isKeyTarget(key);
              const secondarySeq = isSecondarySequenceKey(key);
              const pressed = pressedKeys.has(key.code);
              const isSpace = key.code === 'Space';
              const isSpecial = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'].includes(key.code);
              const isQwertzSwapped = key.code === 'KeyZ' || key.code === 'KeyY';

              // Step indicator for dead-key composition (1. krok / 2. krok)
              const showStep1Badge = targetKeyInfo?.isDeadKeySequence && key.code === targetKeyInfo.code && targetKeyInfo.step === 1;
              const showStep2Badge = targetKeyInfo?.isDeadKeySequence && (
                (targetKeyInfo.step === 1 && key.code === targetKeyInfo.baseCode) ||
                (targetKeyInfo.step === 2 && key.code === targetKeyInfo.code)
              );

              const widthStyle = key.width
                ? { flexGrow: key.width, flexBasis: `${key.width * 38}px` }
                : { flexGrow: 1, flexBasis: '38px' };

              return (
                <div
                  key={key.code}
                  style={widthStyle}
                  className={`key-cap relative flex flex-col justify-between p-1 md:p-1.5 rounded-lg border text-xs font-mono transition-all duration-75 min-h-[42px] md:min-h-[50px] ${getFingerIndicatorClass(
                    key.finger,
                    target,
                    pressed,
                    secondarySeq
                  )} ${isSpecial ? 'bg-slate-950/70 text-slate-400 text-[10px] md:text-xs' : ''}`}
                >
                  {/* Subtle top finger strip */}
                  {showFingerColors && !isSpecial && (
                    <div
                      className={`absolute top-0.5 left-1.5 right-1.5 h-0.5 rounded-full opacity-60 ${getFingerBarColor(
                        key.finger
                      )}`}
                    />
                  )}

                  {/* Step badges for dead key composition */}
                  {showStep1Badge && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-sans font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-md z-10 whitespace-nowrap">
                      1. krok
                    </div>
                  )}
                  {showStep2Badge && (
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 font-sans font-bold text-[9px] px-1.5 py-0.2 rounded-full shadow-md z-10 whitespace-nowrap ${
                      targetKeyInfo?.step === 2
                        ? 'bg-amber-400 text-slate-950 font-black animate-bounce'
                        : 'bg-slate-800 text-amber-300 border border-amber-500/40'
                    }`}>
                      2. krok
                    </div>
                  )}

                  {/* Top line: Secondary (Shift) and AltGr glyphs */}
                  {!isSpecial && !isSpace ? (
                    <div className="flex justify-between items-start text-[10px] md:text-[11px] leading-none text-slate-400">
                      <span className="font-semibold text-slate-400">{key.secondary || ''}</span>
                      <span className="text-slate-400 text-[9px]">{key.altGr || ''}</span>
                    </div>
                  ) : null}

                  {/* Main / Primary glyph */}
                  <div
                    className={`flex items-center justify-center flex-1 font-bold ${
                      isSpecial
                        ? 'text-[10px] md:text-xs'
                        : isQwertzSwapped
                        ? 'text-sm md:text-base text-amber-300'
                        : 'text-xs md:text-sm'
                    }`}
                  >
                    {key.displayLabel || key.primary}
                  </div>

                  {/* Tactile bumps for home keys F & J */}
                  {key.isHomeKey && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 rounded-full bg-amber-400/80 shadow-sm" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger Legend */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/80"></span> Malíček L
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80"></span> Prsteníček L (Y)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80"></span> Prostředníček L
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/80"></span> Ukazováček L (F)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/80"></span> Palce
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-teal-500/80"></span> Ukazováček P (J, Z)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80"></span> Prostředníček P
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80"></span> Prsteníček P
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/80"></span> Malíček P (ů, ú)
        </span>
      </div>
    </div>
  );
};
