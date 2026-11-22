/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LESSON_CHAPTERS, LESSONS } from '../data/lessons';
import { Lesson, UserStats } from '../types';
import { Star, CheckCircle, ChevronDown, ChevronRight, Play } from 'lucide-react';

interface LessonListProps {
  userStats: UserStats;
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({
  userStats,
  currentLessonId,
  onSelectLesson,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'chapter-1': true,
    'chapter-2': true,
    'chapter-3': true,
    'chapter-4': true,
    'chapter-5': true,
    'chapter-6': true,
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {LESSON_CHAPTERS.map((chapter) => {
        const chapterLessons = LESSONS.filter((l) => l.chapterId === chapter.id);
        const completedInChapter = chapterLessons.filter(
          (l) => userStats.completedLessons[l.id]
        ).length;
        const isExpanded = expandedChapters[chapter.id] ?? true;

        return (
          <div
            key={chapter.id}
            className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden backdrop-blur-sm"
          >
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-850/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-sm font-bold font-mono text-amber-400">
                  {chapter.number}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {chapter.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-mono">
                  {completedInChapter}/{chapterLessons.length} hotovo
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {/* Lessons List inside Chapter */}
            {isExpanded && (
              <div className="border-t border-slate-800/80 divide-y divide-slate-800/60">
                {chapterLessons.map((lesson) => {
                  const record = userStats.completedLessons[lesson.id];
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={`px-5 py-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/10 border-l-2 border-amber-400'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-6 flex items-center justify-center">
                          {record ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="text-xs font-mono text-slate-400">
                              {lesson.lessonNumber}.
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-200 truncate">
                              {lesson.title}
                            </h4>
                            {record && (
                              <div className="flex items-center gap-0.5 ml-1">
                                {[1, 2, 3].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= record.stars
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-slate-700'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {lesson.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {record ? (
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-amber-400">
                              {record.cpm} úhozů/min
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono">
                              přesnost {record.accuracy}%
                            </div>
                          </div>
                        ) : (
                          <div className="text-right">
                            <span className="text-xs font-mono text-slate-400">
                              cíl {lesson.targetCpm} ú/m
                            </span>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLesson(lesson);
                          }}
                          className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 font-semibold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
