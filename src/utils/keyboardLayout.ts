/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FingerType, KeyDefinition } from '../types';

export const FINGER_COLORS: Record<FingerType, { bg: string; text: string; labelCs: string; labelEn: string; border: string }> = {
  'left-pinky': {
    bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40 dark:border-rose-500/50',
    text: 'text-rose-400',
    border: 'border-rose-500',
    labelCs: 'Levý malíček',
    labelEn: 'Left Pinky',
  },
  'left-ring': {
    bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40 dark:border-amber-500/50',
    text: 'text-amber-400',
    border: 'border-amber-500',
    labelCs: 'Levý prsteníček',
    labelEn: 'Left Ring',
  },
  'left-middle': {
    bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 dark:border-emerald-500/50',
    text: 'text-emerald-400',
    border: 'border-emerald-500',
    labelCs: 'Levý prostředníček',
    labelEn: 'Left Middle',
  },
  'left-index': {
    bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 dark:border-sky-500/50',
    text: 'text-sky-400',
    border: 'border-sky-500',
    labelCs: 'Levý ukazováček',
    labelEn: 'Left Index',
  },
  'thumb': {
    bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 dark:border-indigo-500/50',
    text: 'text-indigo-400',
    border: 'border-indigo-500',
    labelCs: 'Palec (levý či pravý)',
    labelEn: 'Thumb (space)',
  },
  'right-index': {
    bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40 dark:border-teal-500/50',
    text: 'text-teal-400',
    border: 'border-teal-500',
    labelCs: 'Pravý ukazováček',
    labelEn: 'Right Index',
  },
  'right-middle': {
    bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 dark:border-emerald-500/50',
    text: 'text-emerald-400',
    border: 'border-emerald-500',
    labelCs: 'Pravý prostředníček',
    labelEn: 'Right Middle',
  },
  'right-ring': {
    bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40 dark:border-amber-500/50',
    text: 'text-amber-400',
    border: 'border-amber-500',
    labelCs: 'Pravý prsteníček',
    labelEn: 'Right Ring',
  },
  'right-pinky': {
    bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40 dark:border-purple-500/50',
    text: 'text-purple-400',
    border: 'border-purple-500',
    labelCs: 'Pravý malíček',
    labelEn: 'Right Pinky',
  },
};

export const CZECH_QWERTZ_ROWS: KeyDefinition[][] = [
  // Row 0: Number & Czech Diacritics Row
  [
    { code: 'Backquote', primary: ';', secondary: '~', altGr: '°', finger: 'left-pinky', hand: 'left', width: 1 },
    { code: 'Digit1', primary: '+', secondary: '1', altGr: '~', finger: 'left-pinky', hand: 'left', width: 1 },
    { code: 'Digit2', primary: 'ě', secondary: '2', altGr: 'ˇ', finger: 'left-ring', hand: 'left', width: 1 },
    { code: 'Digit3', primary: 'š', secondary: '3', altGr: '^', finger: 'left-middle', hand: 'left', width: 1 },
    { code: 'Digit4', primary: 'č', secondary: '4', altGr: '˘', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'Digit5', primary: 'ř', secondary: '5', altGr: '°', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'Digit6', primary: 'ž', secondary: '6', altGr: '˛', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'Digit7', primary: 'ý', secondary: '7', altGr: '`', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'Digit8', primary: 'á', secondary: '8', altGr: '˙', finger: 'right-middle', hand: 'right', width: 1 },
    { code: 'Digit9', primary: 'í', secondary: '9', altGr: '´', finger: 'right-ring', hand: 'right', width: 1 },
    { code: 'Digit0', primary: 'é', secondary: '0', altGr: '˝', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Minus', primary: '=', secondary: '%', altGr: '¨', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Equal', primary: '´', secondary: 'ˇ', altGr: '¸', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Backspace', primary: 'Backspace', displayLabel: '⌫', finger: 'right-pinky', hand: 'right', width: 2 },
  ],
  // Row 1: QWERTZ Row (Z is here!)
  [
    { code: 'Tab', primary: 'Tab', displayLabel: '⇥ Tab', finger: 'left-pinky', hand: 'left', width: 1.5 },
    { code: 'KeyQ', primary: 'q', secondary: 'Q', finger: 'left-pinky', hand: 'left', width: 1 },
    { code: 'KeyW', primary: 'w', secondary: 'W', finger: 'left-ring', hand: 'left', width: 1 },
    { code: 'KeyE', primary: 'e', secondary: 'E', altGr: '€', finger: 'left-middle', hand: 'left', width: 1 },
    { code: 'KeyR', primary: 'r', secondary: 'R', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyT', primary: 't', secondary: 'T', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyZ', primary: 'z', secondary: 'Z', finger: 'right-index', hand: 'right', width: 1 }, // QWERTZ!
    { code: 'KeyU', primary: 'u', secondary: 'U', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'KeyI', primary: 'i', secondary: 'I', finger: 'right-middle', hand: 'right', width: 1 },
    { code: 'KeyO', primary: 'o', secondary: 'O', finger: 'right-ring', hand: 'right', width: 1 },
    { code: 'KeyP', primary: 'p', secondary: 'P', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'BracketLeft', primary: 'ú', secondary: '/', altGr: '[', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'BracketRight', primary: ')', secondary: '(', altGr: ']', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Backslash', primary: '¨', secondary: '\'', altGr: '|', finger: 'right-pinky', hand: 'right', width: 1.5 },
  ],
  // Row 2: Home Row (A S D F G H J K L ů §)
  [
    { code: 'CapsLock', primary: 'Caps', displayLabel: 'Caps Lock', finger: 'left-pinky', hand: 'left', width: 1.75 },
    { code: 'KeyA', primary: 'a', secondary: 'A', finger: 'left-pinky', hand: 'left', width: 1 },
    { code: 'KeyS', primary: 's', secondary: 'S', altGr: 'đ', finger: 'left-ring', hand: 'left', width: 1 },
    { code: 'KeyD', primary: 'd', secondary: 'D', altGr: 'Đ', finger: 'left-middle', hand: 'left', width: 1 },
    { code: 'KeyF', primary: 'f', secondary: 'F', altGr: '[', isHomeKey: true, finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyG', primary: 'g', secondary: 'G', altGr: ']', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyH', primary: 'h', secondary: 'H', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'KeyJ', primary: 'j', secondary: 'J', isHomeKey: true, finger: 'right-index', hand: 'right', width: 1 },
    { code: 'KeyK', primary: 'k', secondary: 'K', altGr: 'ł', finger: 'right-middle', hand: 'right', width: 1 },
    { code: 'KeyL', primary: 'l', secondary: 'L', altGr: 'Ł', finger: 'right-ring', hand: 'right', width: 1 },
    { code: 'Semicolon', primary: 'ů', secondary: '"', altGr: '$', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Quote', primary: '§', secondary: '!', altGr: 'ß', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'Enter', primary: 'Enter', displayLabel: '⏎ Enter', finger: 'right-pinky', hand: 'right', width: 2.25 },
  ],
  // Row 3: Bottom Row (Y is here!)
  [
    { code: 'ShiftLeft', primary: 'Shift', displayLabel: '⇧ Shift', finger: 'left-pinky', hand: 'left', width: 1.3 },
    { code: 'IntlBackslash', primary: '\\', secondary: '|', altGr: '<', finger: 'left-pinky', hand: 'left', width: 1 },
    { code: 'KeyY', primary: 'y', secondary: 'Y', finger: 'left-ring', hand: 'left', width: 1 }, // QWERTZ!
    { code: 'KeyX', primary: 'x', secondary: 'X', altGr: '#', finger: 'left-middle', hand: 'left', width: 1 },
    { code: 'KeyC', primary: 'c', secondary: 'C', altGr: '&', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyV', primary: 'v', secondary: 'V', altGr: '@', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyB', primary: 'b', secondary: 'B', altGr: '{', finger: 'left-index', hand: 'left', width: 1 },
    { code: 'KeyN', primary: 'n', secondary: 'N', altGr: '}', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'KeyM', primary: 'm', secondary: 'M', finger: 'right-index', hand: 'right', width: 1 },
    { code: 'Comma', primary: ',', secondary: '?', altGr: '<', finger: 'right-middle', hand: 'right', width: 1 },
    { code: 'Period', primary: '.', secondary: ':', altGr: '>', finger: 'right-ring', hand: 'right', width: 1 },
    { code: 'Slash', primary: '-', secondary: '_', altGr: '*', finger: 'right-pinky', hand: 'right', width: 1 },
    { code: 'ShiftRight', primary: 'Shift', displayLabel: '⇧ Shift', finger: 'right-pinky', hand: 'right', width: 2.7 },
  ],
  // Row 4: Space & Modifiers
  [
    { code: 'ControlLeft', primary: 'Ctrl', displayLabel: 'Ctrl', finger: 'left-pinky', hand: 'left', width: 1.4 },
    { code: 'MetaLeft', primary: 'Win', displayLabel: '⊞', finger: 'left-pinky', hand: 'left', width: 1.25 },
    { code: 'AltLeft', primary: 'Alt', displayLabel: 'Alt', finger: 'thumb', hand: 'left', width: 1.25 },
    { code: 'Space', primary: ' ', displayLabel: 'Mezerník', finger: 'thumb', hand: 'space', width: 6.2 },
    { code: 'AltRight', primary: 'AltGr', displayLabel: 'AltGr', finger: 'thumb', hand: 'right', width: 1.25 },
    { code: 'MetaRight', primary: 'Win', displayLabel: '⊞', finger: 'right-pinky', hand: 'right', width: 1.25 },
    { code: 'ControlRight', primary: 'Ctrl', displayLabel: 'Ctrl', finger: 'right-pinky', hand: 'right', width: 1.6 },
  ],
];

export interface KeyTargetInfo {
  code: string;
  primaryKey: string;
  finger: FingerType;
  hand: 'left' | 'right' | 'space';
  needsShift: boolean;
  shiftSide?: 'left' | 'right'; // which Shift to press (opposite hand)
  isDeadKeySequence?: boolean;
  deadType?: 'acute' | 'caron' | 'ring' | 'umlaut';
  deadKeyCode?: string; // e.g. 'Equal' for caron or acute
  deadKeyNeedsShift?: boolean;
  deadKeyFinger?: FingerType;
  deadKeyHand?: 'left' | 'right';
  deadKeyShiftSide?: 'left' | 'right';
  baseCode?: string;
  baseChar?: string;
  baseFinger?: FingerType;
  baseHand?: 'left' | 'right';
  baseNeedsShift?: boolean;
  step?: 1 | 2;
  instructionCs: string;
  instructionEn: string;
}

// Determines if a keyboard event corresponds to a Czech dead key (čárka, háček, kroužek, přehláska)
export function isDeadKeyEvent(
  e: {
    key: string;
    code: string;
    shiftKey: boolean;
    altKey: boolean;
  },
  expectedChar?: string
): 'acute' | 'caron' | 'ring' | 'umlaut' | null {
  const isCaronTarget = expectedChar && 'čšžřěďťňČŠŽŘĚĎŤŇ'.includes(expectedChar);
  const isAcuteTarget = expectedChar && 'áéíóúýÁÉÍÓÚÝ'.includes(expectedChar);
  const isRingTarget = expectedChar && 'ůŮ'.includes(expectedChar);
  const isUmlautTarget = expectedChar && 'äöüÄÖÜëË'.includes(expectedChar);

  // Direct key symbols
  if (e.key === 'ˇ') return 'caron';
  if (e.key === '´') return 'acute';
  if (e.key === '°') return 'ring';
  if (e.key === '¨') return 'umlaut';

  // Mac Option dead key shortcuts (e.g. on US / ABC / ABC-Extended layout):
  // Option + v = caron ˇ
  if (e.altKey && (e.code === 'KeyV' || (e.key === 'Dead' && isCaronTarget))) {
    return 'caron';
  }
  // Option + e = acute ´
  if (e.altKey && (e.code === 'KeyE' || (e.key === 'Dead' && isAcuteTarget))) {
    return 'acute';
  }
  // Option + k = ring °
  if (e.altKey && (e.code === 'KeyK' || (e.key === 'Dead' && isRingTarget))) {
    return 'ring';
  }
  // Option + u = umlaut ¨
  if (e.altKey && (e.code === 'KeyU' || (e.key === 'Dead' && isUmlautTarget))) {
    return 'umlaut';
  }

  // Physical key next to Backspace on Czech layout (code: Equal or Minus)
  // Without Shift: acute ´ (čárka)
  // With Shift: caron ˇ (háček)
  if (e.code === 'Equal' || e.code === 'Minus') {
    if (e.shiftKey) return 'caron';
    if (isCaronTarget) return 'caron';
    return 'acute';
  }

  // Key under Esc (Backquote) with Shift or AltGr produces ring ° (kroužek)
  if (e.code === 'Backquote' && (e.shiftKey || e.altKey)) {
    return 'ring';
  }

  // Key next to Enter (Backslash) produces umlaut ¨ (přehláska)
  if (e.code === 'Backslash' && !e.shiftKey) {
    return 'umlaut';
  }

  // Generic 'Dead' reported by macOS / Windows on dead keys
  if (e.key === 'Dead') {
    if (isCaronTarget) return 'caron';
    if (isAcuteTarget) return 'acute';
    if (isRingTarget) return 'ring';
    if (isUmlautTarget) return 'umlaut';
    return e.shiftKey ? 'caron' : 'acute';
  }

  // Single quote key on macOS when used as dead acute
  if (e.key === "'" && (isAcuteTarget || !e.shiftKey)) {
    return 'acute';
  }

  return null;
}

// Composes a dead key with a base character
export function composeWithDeadKey(
  deadType: 'acute' | 'caron' | 'ring' | 'umlaut',
  baseKey: string
): string | null {
  const isUpper = baseKey === baseKey.toUpperCase() && baseKey !== baseKey.toLowerCase();
  const lower = baseKey.toLowerCase();

  if (deadType === 'acute') {
    switch (lower) {
      case 'o': return isUpper ? 'Ó' : 'ó';
      case 'a': return isUpper ? 'Á' : 'á';
      case 'e': return isUpper ? 'É' : 'é';
      case 'i': return isUpper ? 'Í' : 'í';
      case 'u': return isUpper ? 'Ú' : 'ú';
      case 'y': return isUpper ? 'Ý' : 'ý';
      case 'c': return isUpper ? 'Ć' : 'ć';
      case 'n': return isUpper ? 'Ń' : 'ń';
      case 's': return isUpper ? 'Ś' : 'ś';
      case 'z': return isUpper ? 'Ź' : 'ź';
      case ' ':
      case '´':
      case '\'':
        return '´';
      default: return null;
    }
  }

  if (deadType === 'caron') {
    switch (lower) {
      case 'c': return isUpper ? 'Č' : 'č';
      case 's': return isUpper ? 'Š' : 'š';
      case 'z': return isUpper ? 'Ž' : 'ž';
      case 'r': return isUpper ? 'Ř' : 'ř';
      case 'e': return isUpper ? 'Ě' : 'ě';
      case 'd': return isUpper ? 'Ď' : 'ď';
      case 't': return isUpper ? 'Ť' : 'ť';
      case 'n': return isUpper ? 'Ň' : 'ň';
      case 'l': return isUpper ? 'Ľ' : 'ľ';
      case ' ':
      case 'ˇ':
        return 'ˇ';
      default: return null;
    }
  }

  if (deadType === 'ring') {
    switch (lower) {
      case 'u': return isUpper ? 'Ů' : 'ů';
      case ' ':
      case '°':
        return '°';
      default: return null;
    }
  }

  if (deadType === 'umlaut') {
    switch (lower) {
      case 'a': return isUpper ? 'Ä' : 'ä';
      case 'o': return isUpper ? 'Ö' : 'ö';
      case 'u': return isUpper ? 'Ü' : 'ü';
      case 'e': return isUpper ? 'Ë' : 'ë';
      case ' ':
      case '¨':
        return '¨';
      default: return null;
    }
  }

  return null;
}

// Adjusts the target key info depending on whether step 1 (dead key) is active or completed
export function getStepTargetKeyInfo(info: KeyTargetInfo, isDeadKeyPending: boolean): KeyTargetInfo {
  if (!info.isDeadKeySequence) return info;

  if (!isDeadKeyPending) {
    // Step 1: User needs to strike the dead key
    const isCaron = info.deadType === 'caron';
    const isRing = info.deadType === 'ring';
    const isUmlaut = info.deadType === 'umlaut';

    const deadLabel = isCaron
      ? 'háček ˇ (Shift + klávesa vedle Backspace)'
      : isRing
      ? 'kroužek ° (Shift + klávesa pod Esc)'
      : isUmlaut
      ? 'přehlásku ¨'
      : 'čárku ´ (klávesa vedle Backspace)';

    return {
      ...info,
      step: 1,
      code: info.deadKeyCode || 'Equal',
      primaryKey: isCaron ? 'ˇ' : isRing ? '°' : isUmlaut ? '¨' : '´',
      finger: info.deadKeyFinger || 'right-pinky',
      hand: info.deadKeyHand || 'right',
      needsShift: !!info.deadKeyNeedsShift,
      shiftSide: info.deadKeyShiftSide || (info.deadKeyNeedsShift ? 'left' : undefined),
      instructionCs: `1. krok z 2: Stiskněte ${deadLabel} → poté stisknete ${info.baseChar || info.primaryKey}`,
      instructionEn: `Step 1 of 2: Press dead key ${isCaron ? 'ˇ' : isRing ? '°' : '´'} → then press ${info.baseChar || info.primaryKey}`,
    };
  } else {
    // Step 2: Dead key is held in buffer, now press the base letter!
    return {
      ...info,
      step: 2,
      code: info.baseCode || info.code,
      primaryKey: info.baseChar || info.primaryKey,
      finger: info.baseFinger || info.finger,
      hand: info.baseHand || info.hand,
      needsShift: !!info.baseNeedsShift,
      shiftSide: info.baseNeedsShift ? (info.baseHand === 'left' ? 'right' : 'left') : undefined,
      instructionCs: `2. krok z 2: Mrtvá klávesa aktivní! Nyní stiskněte ${info.baseChar} ${
        info.baseNeedsShift ? '(s Shiftem)' : ''
      } pro vytvoření ${info.primaryKey}`,
      instructionEn: `Step 2 of 2: Dead key active! Press ${info.baseChar} ${
        info.baseNeedsShift ? '(with Shift)' : ''
      } to type ${info.primaryKey}`,
    };
  }
}

// Complete table of composed Czech letters
const COMPOSED_CZECH_LETTERS: Record<
  string,
  {
    deadType: 'acute' | 'caron' | 'ring' | 'umlaut';
    deadKeyCode: string;
    deadKeyNeedsShift: boolean;
    deadKeyFinger: FingerType;
    deadKeyHand: 'left' | 'right';
    deadKeyShiftSide?: 'left' | 'right';
    baseCode: string;
    baseChar: string;
    baseFinger: FingerType;
    baseHand: 'left' | 'right';
    baseNeedsShift: boolean;
    instructionCs: string;
    instructionEn: string;
  }
> = {
  // ó and Ó (Acute + O)
  'ó': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyO',
    baseChar: 'o',
    baseFinger: 'right-ring',
    baseHand: 'right',
    baseNeedsShift: false,
    instructionCs: 'Složený znak ó: 1. krok: čárka ´ (vedle Backspace) → 2. krok: klávesa o',
    instructionEn: 'Composed ó: Step 1: acute ´ (next to Backspace) → Step 2: key o',
  },
  'Ó': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyO',
    baseChar: 'O',
    baseFinger: 'right-ring',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ó: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + O',
    instructionEn: 'Composed Ó: Step 1: acute ´ (next to Backspace) → Step 2: Shift + O',
  },

  // Uppercase Caron Accents: Č, Š, Ž, Ř, Ě, Ď, Ť, Ň
  'Č': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyC',
    baseChar: 'C',
    baseFinger: 'left-index',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Č: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + C (nebo c)',
    instructionEn: 'Composed Č: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + C',
  },
  'Š': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyS',
    baseChar: 'S',
    baseFinger: 'left-ring',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Š: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + S',
    instructionEn: 'Composed Š: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + S',
  },
  'Ž': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyZ',
    baseChar: 'Z',
    baseFinger: 'right-index',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ž: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + Z (nahoře)',
    instructionEn: 'Composed Ž: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + Z (top row)',
  },
  'Ř': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyR',
    baseChar: 'R',
    baseFinger: 'left-index',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ř: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + R',
    instructionEn: 'Composed Ř: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + R',
  },
  'Ě': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyE',
    baseChar: 'E',
    baseFinger: 'left-middle',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ě: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + E',
    instructionEn: 'Composed Ě: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + E',
  },
  'Ď': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyD',
    baseChar: 'D',
    baseFinger: 'left-middle',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ď: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + D',
    instructionEn: 'Composed Ď: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + D',
  },
  'ď': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyD',
    baseChar: 'd',
    baseFinger: 'left-middle',
    baseHand: 'left',
    baseNeedsShift: false,
    instructionCs: 'Složený znak ď: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: klávesa d',
    instructionEn: 'Composed ď: Step 1: Shift + ˇ (next to Backspace) → Step 2: key d',
  },
  'Ť': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyT',
    baseChar: 'T',
    baseFinger: 'left-index',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ť: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + T',
    instructionEn: 'Composed Ť: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + T',
  },
  'ť': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyT',
    baseChar: 't',
    baseFinger: 'left-index',
    baseHand: 'left',
    baseNeedsShift: false,
    instructionCs: 'Složený znak ť: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: klávesa t',
    instructionEn: 'Composed ť: Step 1: Shift + ˇ (next to Backspace) → Step 2: key t',
  },
  'Ň': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyN',
    baseChar: 'N',
    baseFinger: 'right-index',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ň: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: Shift + N',
    instructionEn: 'Composed Ň: Step 1: Shift + ˇ (next to Backspace) → Step 2: Shift + N',
  },
  'ň': {
    deadType: 'caron',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    deadKeyShiftSide: 'left',
    baseCode: 'KeyN',
    baseChar: 'n',
    baseFinger: 'right-index',
    baseHand: 'right',
    baseNeedsShift: false,
    instructionCs: 'Složený znak ň: 1. krok: Shift + ˇ (vedle Backspace) → 2. krok: klávesa n',
    instructionEn: 'Composed ň: Step 1: Shift + ˇ (next to Backspace) → Step 2: key n',
  },

  // Uppercase Acute Accents: Á, É, Í, Ý, Ú
  'Á': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyA',
    baseChar: 'A',
    baseFinger: 'left-pinky',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Á: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + A',
    instructionEn: 'Composed Á: Step 1: acute ´ (next to Backspace) → Step 2: Shift + A',
  },
  'É': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyE',
    baseChar: 'E',
    baseFinger: 'left-middle',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak É: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + E',
    instructionEn: 'Composed É: Step 1: acute ´ (next to Backspace) → Step 2: Shift + E',
  },
  'Í': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyI',
    baseChar: 'I',
    baseFinger: 'right-middle',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Í: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + I',
    instructionEn: 'Composed Í: Step 1: acute ´ (next to Backspace) → Step 2: Shift + I',
  },
  'Ý': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyY',
    baseChar: 'Y',
    baseFinger: 'left-ring',
    baseHand: 'left',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ý: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + Y (dole)',
    instructionEn: 'Composed Ý: Step 1: acute ´ (next to Backspace) → Step 2: Shift + Y (bottom row)',
  },
  'Ú': {
    deadType: 'acute',
    deadKeyCode: 'Equal',
    deadKeyNeedsShift: false,
    deadKeyFinger: 'right-pinky',
    deadKeyHand: 'right',
    baseCode: 'KeyU',
    baseChar: 'U',
    baseFinger: 'right-index',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ú: 1. krok: čárka ´ (vedle Backspace) → 2. krok: Shift + U',
    instructionEn: 'Composed Ú: Step 1: acute ´ (next to Backspace) → Step 2: Shift + U',
  },

  // Ring Accent: Ů
  'Ů': {
    deadType: 'ring',
    deadKeyCode: 'Backquote',
    deadKeyNeedsShift: true,
    deadKeyFinger: 'left-pinky',
    deadKeyHand: 'left',
    deadKeyShiftSide: 'right',
    baseCode: 'KeyU',
    baseChar: 'U',
    baseFinger: 'right-index',
    baseHand: 'right',
    baseNeedsShift: true,
    instructionCs: 'Složený znak Ů: 1. krok: Shift + ° (pod Esc) → 2. krok: Shift + U',
    instructionEn: 'Composed Ů: Step 1: Shift + ° (below Esc) → Step 2: Shift + U',
  },
};

// Quick lookup table for every character in Czech typing
export function getTargetKeyForChar(char: string): KeyTargetInfo | null {
  if (char === ' ') {
    return {
      code: 'Space',
      primaryKey: 'Space',
      finger: 'thumb',
      hand: 'space',
      needsShift: false,
      instructionCs: 'Palcem stiskněte mezerník',
      instructionEn: 'Press spacebar with your thumb',
    };
  }

  // Priority 1: Check composed Czech letters (ó, Č, Š, Ž, Ř, Ď, ď, Ť, ť, Ň, ň, Á, É, Í, Ý, Ó, Ú, Ů)
  if (COMPOSED_CZECH_LETTERS[char]) {
    const item = COMPOSED_CZECH_LETTERS[char];
    return {
      code: item.baseCode,
      primaryKey: char,
      finger: item.baseFinger,
      hand: item.baseHand,
      needsShift: item.baseNeedsShift,
      shiftSide: item.baseNeedsShift ? (item.baseHand === 'left' ? 'right' : 'left') : undefined,
      isDeadKeySequence: true,
      deadType: item.deadType,
      deadKeyCode: item.deadKeyCode,
      deadKeyNeedsShift: item.deadKeyNeedsShift,
      deadKeyFinger: item.deadKeyFinger,
      deadKeyHand: item.deadKeyHand,
      deadKeyShiftSide: item.deadKeyShiftSide,
      baseCode: item.baseCode,
      baseChar: item.baseChar,
      baseFinger: item.baseFinger,
      baseHand: item.baseHand,
      baseNeedsShift: item.baseNeedsShift,
      instructionCs: item.instructionCs,
      instructionEn: item.instructionEn,
    };
  }

  // Priority 2: Check direct primary keys in Czech QWERTZ rows (e.g. ě, š, č, ř, ž, ý, á, í, é, ú, ů, a, b...)
  for (const row of CZECH_QWERTZ_ROWS) {
    for (const key of row) {
      if (key.primary === char) {
        return {
          code: key.code,
          primaryKey: key.primary,
          finger: key.finger,
          hand: key.hand,
          needsShift: false,
          instructionCs: `${FINGER_COLORS[key.finger].labelCs} – stiskněte klávesu ${key.primary.toUpperCase()}`,
          instructionEn: `${FINGER_COLORS[key.finger].labelEn} – press ${key.primary.toUpperCase()}`,
        };
      }
    }
  }

  // Priority 3: Check shifted single keys (like secondary characters: numbers 1-0 or capitals A-Z)
  for (const row of CZECH_QWERTZ_ROWS) {
    for (const key of row) {
      if (key.secondary === char) {
        // Use opposite Shift key
        const shiftSide = key.hand === 'left' ? 'right' : 'left';
        return {
          code: key.code,
          primaryKey: key.primary,
          finger: key.finger,
          hand: key.hand,
          needsShift: true,
          shiftSide,
          instructionCs: `Držte ${shiftSide === 'right' ? 'pravý' : 'levý'} Shift a ${FINGER_COLORS[key.finger].labelCs.toLowerCase()} stiskněte ${key.primary.toUpperCase()}`,
          instructionEn: `Hold ${shiftSide} Shift and press ${key.primary.toUpperCase()} with ${FINGER_COLORS[key.finger].labelEn.toLowerCase()}`,
        };
      }
    }
  }

  // Fallback
  return {
    code: 'Key' + char.toUpperCase(),
    primaryKey: char.toLowerCase(),
    finger: 'left-index',
    hand: 'left',
    needsShift: char === char.toUpperCase() && char !== char.toLowerCase(),
    instructionCs: `Stiskněte klávesu ${char}`,
    instructionEn: `Press key ${char}`,
  };
}
