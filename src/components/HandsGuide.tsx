/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FingerType } from '../types';
import { FINGER_COLORS } from '../utils/keyboardLayout';

interface HandsGuideProps {
  activeFinger: FingerType | null;
  activeHand: 'left' | 'right' | 'space' | null;
  needsShift?: boolean;
  shiftSide?: 'left' | 'right';
}

export const HandsGuide: React.FC<HandsGuideProps> = ({
  activeFinger,
  activeHand,
  needsShift,
  shiftSide,
}) => {
  const isLeftShift = needsShift && shiftSide === 'left';
  const isRightShift = needsShift && shiftSide === 'right';

  const isFingerActive = (hand: 'left' | 'right', finger: string) => {
    if (hand === 'left' && isLeftShift && finger === 'pinky') return true;
    if (hand === 'right' && isRightShift && finger === 'pinky') return true;

    if (activeFinger === 'thumb') return finger === 'thumb';
    if (activeFinger === `left-${finger}` && hand === 'left') return true;
    if (activeFinger === `right-${finger}` && hand === 'right') return true;
    return false;
  };

  const getFingerFill = (hand: 'left' | 'right', finger: string) => {
    const active = isFingerActive(hand, finger);
    if (!active) {
      return 'fill-slate-800 stroke-slate-700/80 dark:fill-slate-800 dark:stroke-slate-700';
    }

    // Active color
    if ((hand === 'left' && isLeftShift && finger === 'pinky') || (hand === 'right' && isRightShift && finger === 'pinky')) {
      return 'fill-rose-500/80 stroke-rose-300 animate-pulse';
    }

    if (finger === 'thumb') return 'fill-indigo-500/80 stroke-indigo-300 animate-pulse';
    if (finger === 'index') return 'fill-sky-500/80 stroke-sky-300 animate-pulse';
    if (finger === 'middle') return 'fill-emerald-500/80 stroke-emerald-300 animate-pulse';
    if (finger === 'ring') return 'fill-amber-500/80 stroke-amber-300 animate-pulse';
    if (finger === 'pinky') return 'fill-purple-500/80 stroke-purple-300 animate-pulse';

    return 'fill-amber-500 stroke-amber-300';
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 select-none">
      <div className="flex items-center justify-center gap-10 md:gap-16">
        {/* Left Hand */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 160 170"
            className="w-28 h-28 md:w-36 md:h-36 drop-shadow-sm transition-all duration-200"
          >
            {/* Palm base */}
            <path
              d="M 30 155 C 30 100, 40 85, 45 75 C 65 70, 95 70, 115 80 C 120 100, 125 130, 120 155 Z"
              className="fill-slate-800/80 stroke-slate-700 stroke-[1.5]"
            />
            {/* Wrist */}
            <path
              d="M 35 155 L 45 170 L 110 170 L 115 155 Z"
              className="fill-slate-900/60 stroke-slate-700/60 stroke-[1.2]"
            />

            {/* Left Pinky */}
            <g className="transition-all duration-150">
              <rect
                x="22"
                y="52"
                width="14"
                height="50"
                rx="7"
                transform="rotate(-14 28 65)"
                className={`${getFingerFill('left', 'pinky')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="18" y="44" className="text-[9px] fill-slate-400 font-mono font-medium">A</text>
            </g>

            {/* Left Ring */}
            <g className="transition-all duration-150">
              <rect
                x="45"
                y="26"
                width="15"
                height="65"
                rx="7.5"
                transform="rotate(-5 52 45)"
                className={`${getFingerFill('left', 'ring')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="49" y="19" className="text-[9px] fill-slate-400 font-mono font-medium">S</text>
            </g>

            {/* Left Middle */}
            <g className="transition-all duration-150">
              <rect
                x="69"
                y="16"
                width="16"
                height="75"
                rx="8"
                className={`${getFingerFill('left', 'middle')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="73" y="10" className="text-[9px] fill-slate-400 font-mono font-medium">D</text>
            </g>

            {/* Left Index */}
            <g className="transition-all duration-150">
              <rect
                x="94"
                y="26"
                width="16"
                height="68"
                rx="8"
                transform="rotate(6 102 45)"
                className={`${getFingerFill('left', 'index')} stroke-[1.5] transition-colors duration-150`}
              />
              {/* Tactile bump marker for F */}
              <circle cx="106" cy="46" r="2.2" className="fill-amber-400" />
              <text x="106" y="20" className="text-[9px] fill-slate-400 font-mono font-bold">F</text>
            </g>

            {/* Left Thumb */}
            <g className="transition-all duration-150">
              <rect
                x="115"
                y="85"
                width="17"
                height="45"
                rx="8.5"
                transform="rotate(40 120 100)"
                className={`${getFingerFill('left', 'thumb')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="144" y="100" className="text-[8px] fill-slate-400 font-mono">Mezera</text>
            </g>
          </svg>
          <span className="text-[11px] font-medium text-slate-400 mt-1">Levá ruka</span>
        </div>

        {/* Right Hand */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 160 170"
            className="w-28 h-28 md:w-36 md:h-36 drop-shadow-sm transition-all duration-200"
          >
            {/* Palm base */}
            <path
              d="M 130 155 C 130 100, 120 85, 115 75 C 95 70, 65 70, 45 80 C 40 100, 35 130, 40 155 Z"
              className="fill-slate-800/80 stroke-slate-700 stroke-[1.5]"
            />
            {/* Wrist */}
            <path
              d="M 125 155 L 115 170 L 50 170 L 45 155 Z"
              className="fill-slate-900/60 stroke-slate-700/60 stroke-[1.2]"
            />

            {/* Right Thumb */}
            <g className="transition-all duration-150">
              <rect
                x="28"
                y="85"
                width="17"
                height="45"
                rx="8.5"
                transform="rotate(-40 40 100)"
                className={`${getFingerFill('right', 'thumb')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="5" y="100" className="text-[8px] fill-slate-400 font-mono">Mezera</text>
            </g>

            {/* Right Index */}
            <g className="transition-all duration-150">
              <rect
                x="50"
                y="26"
                width="16"
                height="68"
                rx="8"
                transform="rotate(-6 58 45)"
                className={`${getFingerFill('right', 'index')} stroke-[1.5] transition-colors duration-150`}
              />
              {/* Tactile bump marker for J */}
              <circle cx="54" cy="46" r="2.2" className="fill-amber-400" />
              <text x="48" y="20" className="text-[9px] fill-slate-400 font-mono font-bold">J</text>
            </g>

            {/* Right Middle */}
            <g className="transition-all duration-150">
              <rect
                x="75"
                y="16"
                width="16"
                height="75"
                rx="8"
                className={`${getFingerFill('right', 'middle')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="79" y="10" className="text-[9px] fill-slate-400 font-mono font-medium">K</text>
            </g>

            {/* Right Ring */}
            <g className="transition-all duration-150">
              <rect
                x="100"
                y="26"
                width="15"
                height="65"
                rx="7.5"
                transform="rotate(5 108 45)"
                className={`${getFingerFill('right', 'ring')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="105" y="19" className="text-[9px] fill-slate-400 font-mono font-medium">L</text>
            </g>

            {/* Right Pinky */}
            <g className="transition-all duration-150">
              <rect
                x="124"
                y="52"
                width="14"
                height="50"
                rx="7"
                transform="rotate(14 132 65)"
                className={`${getFingerFill('right', 'pinky')} stroke-[1.5] transition-colors duration-150`}
              />
              <text x="135" y="44" className="text-[9px] fill-slate-400 font-mono font-medium">ů</text>
            </g>
          </svg>
          <span className="text-[11px] font-medium text-slate-400 mt-1">Pravá ruka</span>
        </div>
      </div>

      {/* Active Finger text description */}
      {activeFinger && (
        <div className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-1.5">
          <span className="text-slate-300">{FINGER_COLORS[activeFinger].labelCs}</span>
          {needsShift && (
            <span className="text-amber-400 text-[11px] font-mono">
              (+ {shiftSide === 'right' ? 'pravý' : 'levý'} Shift)
            </span>
          )}
        </div>
      )}
    </div>
  );
};
