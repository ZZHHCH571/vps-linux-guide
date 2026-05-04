import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Lesson } from '../data/types';
import { getIcon } from '../data/icons';

interface LessonNavProps {
  prevLesson: Lesson | undefined;
  nextLesson: Lesson | undefined;
}

export const LessonNav: React.FC<LessonNavProps> = ({ prevLesson, nextLesson }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
      {prevLesson ? (
        <Link
          to={`/lesson/${prevLesson.id}`}
          className="group flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-200 hover:shadow-[4px_4px_0px_0px_rgba(79,70,229,0.15)] transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-slate-400 mb-0.5">上一节</p>
            <p className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
              {prevLesson.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextLesson ? (
        <Link
          to={`/lesson/${nextLesson.id}`}
          className="group flex items-center justify-end gap-3 p-4 bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-200 hover:shadow-[4px_4px_0px_0px_rgba(79,70,229,0.15)] transition-all sm:col-start-2"
        >
          <div className="min-w-0 text-right">
            <p className="text-xs text-slate-400 mb-0.5">下一节</p>
            <p className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
              {nextLesson.title}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
