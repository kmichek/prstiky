/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FingerType =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyDefinition {
  code: string; // KeyboardEvent.code (e.g., 'KeyF', 'Digit2')
  primary: string; // Unshifted Czech character, e.g., 'f', 'ě'
  secondary?: string; // Shifted character, e.g., 'F', '2'
  altGr?: string; // AltGr character, e.g., '@', '€'
  width?: number; // relative width unit (default 1)
  finger: FingerType;
  hand: 'left' | 'right' | 'space';
  isHomeKey?: boolean; // tactile bump on F and J
  displayLabel?: string; // custom display text (like Enter, Shift)
}

export interface Lesson {
  id: string;
  chapterId: string;
  chapterTitle: string;
  chapterNumber: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  targetCpm: number; // Úhozy za minutu target
  newKeys: string[];
  fingerFocus: string;
  explanation: string;
  text: string;
}

export interface LessonResult {
  lessonId: string;
  stars: number; // 1 to 3
  cpm: number; // Characters per minute (úhozy/min)
  netCpm: number; // Net CPM (hrubé minus penalizace za chyby)
  wpm: number;
  accuracy: number;
  errors: number;
  totalKeystrokes: number;
  elapsedSeconds: number;
  mistakesByKey: Record<string, number>;
  completedAt: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  soundVolume: number;
  soundType: 'mechanical' | 'soft' | 'typewriter';
  metronomeEnabled: boolean;
  metronomeBpm: number;
  showHandsGuide: boolean;
  showVirtualKeyboard: boolean;
  stopOnError: boolean; // whether cursor waits for correct key or moves forward
  theme: 'dark' | 'light';
  language: 'cs' | 'en';
}

export interface UserStats {
  completedLessons: Record<string, LessonResult>;
  totalTests: number;
  totalKeystrokes: number;
  totalTimeMinutes: number;
  keyStats: Record<string, { hits: number; errors: number }>;
  recentResults: LessonResult[];
  streakDays: number;
  lastActiveDate: string;
}
