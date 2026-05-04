import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ChevronRight, CheckCircle } from 'lucide-react';
import { lessons } from '../data/lessons';
import { stages } from '../data/stages';
import { getIcon } from '../data/icons';
import { ProgressBar } from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';

export const HomePage: React.FC = () => {
  const { getCompletedCount, isCompleted } = useProgress();
  const completedCount = getCompletedCount();
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"><Flame className="w-4 h-4" />踩坑复盘式教程</div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Ubuntu 服务器入门</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">不用担心看不懂，每节课都用生活类比来讲，<br />踩过的坑我都帮你标好了 😊</p>
      </div>

      <div className="mb-8">
        <ProgressBar percent={progressPercent} label={`已完成 ${completedCount} / ${totalLessons} 节课程`} />
      </div>
      <div className="space-y-6">
        {stages.map((stage, idx) => (
          <motion.div key={stage.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.15)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                {getIcon(stage.icon, 'w-5 h-5')}
              </div>
              <div><h2 className="text-xl font-bold text-slate-800">{stage.title}</h2><p className="text-slate-500 text-sm">{stage.description}</p></div>
            </div>
            <div className="grid gap-3">
              {stage.lessons.map(lessonId => {
                const lesson = lessons.find(l => l.id === lessonId);
                if (!lesson) return null;
                const done = isCompleted(lesson.id);
                return (
                  <Link key={lesson.id} to={`/lesson/${lesson.id}`} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${done ? 'bg-green-50 border-green-200 hover:border-green-300' : 'bg-slate-50 border-transparent hover:bg-indigo-50 hover:border-indigo-200'}`}>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:shadow-md transition-shadow">
                      {getIcon(lesson.icon)}
                    </div>
                    <div className="flex-1"><h3 className="font-semibold text-slate-800">{lesson.title}</h3><p className="text-sm text-slate-500">{lesson.description}</p></div>
                    {done ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
