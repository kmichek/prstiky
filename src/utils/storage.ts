/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserStats, LessonResult, AppSettings } from '../types';

const STATS_STORAGE_KEY = 'psac_qwertz_user_stats';
const SETTINGS_STORAGE_KEY = 'psac_qwertz_settings';

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  soundVolume: 0.35,
  soundType: 'mechanical',
  metronomeEnabled: false,
  metronomeBpm: 120,
  showHandsGuide: true,
  showVirtualKeyboard: true,
  stopOnError: false,
  theme: 'dark',
  language: 'cs',
};

export const DEFAULT_USER_STATS: UserStats = {
  completedLessons: {},
  totalTests: 0,
  totalKeystrokes: 0,
  totalTimeMinutes: 0,
  keyStats: {},
  recentResults: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // fallback
  }
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
        const last = new Date(parsed.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          parsed.streakDays = (parsed.streakDays || 1) + 1;
        } else if (diffDays > 1) {
          parsed.streakDays = 1;
        }
        parsed.lastActiveDate = today;
      }
      return { ...DEFAULT_USER_STATS, ...parsed };
    }
  } catch {
    // fallback
  }
  return DEFAULT_USER_STATS;
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // fallback
  }
}

export function recordLessonResult(current: UserStats, result: LessonResult): UserStats {
  const updated = { ...current };

  // Update completed lessons record
  const existing = updated.completedLessons[result.lessonId];
  if (!existing || result.cpm > existing.cpm) {
    updated.completedLessons[result.lessonId] = result;
  }

  updated.totalTests += 1;
  updated.totalKeystrokes += result.totalKeystrokes;
  updated.totalTimeMinutes += Math.round(result.elapsedSeconds / 60);

  // Update key mistakes
  const newKeyStats = { ...updated.keyStats };
  Object.entries(result.mistakesByKey).forEach(([char, count]) => {
    if (!newKeyStats[char]) {
      newKeyStats[char] = { hits: count, errors: count };
    } else {
      newKeyStats[char].errors += count;
      newKeyStats[char].hits += count;
    }
  });
  updated.keyStats = newKeyStats;

  // Add to recent results
  updated.recentResults = [...(updated.recentResults || []).slice(-19), result];

  saveUserStats(updated);
  return updated;
}
