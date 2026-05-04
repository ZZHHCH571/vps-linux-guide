import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, BookOpen, HelpCircle, Shield, CheckCircle, AlertCircle,
  Terminal, ShoppingCart, Clock, Wrench, List, X,
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { FavoriteButton } from '../components/FavoriteButton';
import { CommandBlock } from '../components/CommandBlock';
import { MistakeCard } from '../components/MistakeCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { ToolCard } from '../components/ToolCard';
import { NotesPanel } from '../components/NotesPanel';
import { LessonNav } from '../components/LessonNav';
import { TableOfContents, buildSections, type TocSection } from '../components/TableOfContents';
import { Quiz } from '../components/Quiz';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { lessons } from '../data/lessons';
import { stages } from '../data/stages';
import { getIcon } from '../data/icons';
import type { Lesson } from '../data/types';

function estimateReadingTime(lesson: Lesson): number {
  let chars = 0;
  chars += lesson.content.analogy.length;
  chars += lesson.content.explanation.length;
  lesson.content.terms.forEach(t => { chars += t.name.length + t.meaning.length + (t.fullName?.length || 0); });
  lesson.content.tools?.forEach(t => { chars += t.name.length + t.description.length + t.usage.length; });
  lesson.content.commands.forEach(c => { chars += c.description.length + c.explanation.length + c.command.length + (c.output?.length || 0); });
  lesson.content.commonMistakes.forEach(m => { chars += m.error.length + m.cause.length + m.solution.length; });
  lesson.content.bestPractices.forEach(p => { chars += p.length; });
  lesson.content.recommendations?.forEach(r => { chars += r.scenario.length + r.reason.length + (r.config?.length || 0); });
  const minutes = Math.ceil(chars / 350);
  return Math.max(1, minutes);
}

function getAdjacentLessons(lessonId: string) {
  const flatIds = stages.flatMap(s => s.lessons);
  const idx = flatIds.indexOf(lessonId);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prevId = idx > 0 ? flatIds[idx - 1] : undefined;
  const nextId = idx < flatIds.length - 1 ? flatIds[idx + 1] : undefined;
  return {
    prev: prevId ? lessons.find(l => l.id === prevId) : undefined,
    next: nextId ? lessons.find(l => l.id === nextId) : undefined,
  };
}

export const TermCard: React.FC<{ term: any, idx: number }> = ({ term, idx }) => {
  return (
    <div className="bg-white rounded-xl p-3 border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm">
          {idx + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-indigo-800 text-sm">{term.name}</span>
            {term.fullName && <span className="text-xs text-indigo-400 truncate">（{term.fullName}）</span>}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">
            {term.meaning}
          </p>
        </div>
      </div>
    </div>
  );
};

export const LessonPage: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const { markComplete, isCompleted, savingState } = useProgress();
  const completed = isCompleted(lesson.id);
  const isSaving = savingState[lesson.id] || false;
  const { prev, next } = useMemo(() => getAdjacentLessons(lesson.id), [lesson.id]);
  const readingTime = useMemo(() => estimateReadingTime(lesson), [lesson]);
  const tocSections = useMemo(() => buildSections(lesson), [lesson]);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileTocOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="lg:flex lg:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  {getIcon(lesson.icon)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{lesson.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                    <span>{lesson.description}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      约 {readingTime} 分钟
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FavoriteButton lessonId={lesson.id} />
                <button
                  onClick={() => markComplete(lesson.id)}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    completed
                      ? 'bg-green-100 text-green-700 border-2 border-green-200'
                      : 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200 hover:bg-indigo-200'
                  } ${isSaving ? 'opacity-60 cursor-wait' : ''}`}
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {completed ? '已完成' : '标记为完成'}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <section id="section-analogy" className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)]">
              <div className="flex items-center gap-2 mb-3"><Flame className="w-5 h-5 text-amber-500" /><h2 className="text-lg font-bold text-amber-800">生活化类比</h2></div>
              <p className="text-amber-900 leading-relaxed">{lesson.content.analogy}</p>
            </section>
            <section id="section-explanation" className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.15)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md text-lg">
                  📖
                </div>
                <h2 className="text-lg font-bold text-slate-800">概念详解</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-base">{lesson.content.explanation}</p>
              </div>
              {lesson.content.terms && lesson.content.terms.length > 0 && (
                <div id="section-terms" className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border-2 border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-indigo-800">💡 关键术语</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.content.terms.map((term, idx) => (
                      <TermCard key={idx} term={term} idx={idx} />
                    ))}
                  </div>
                </div>
              )}
            </section>
            {lesson.content.recommendations && lesson.content.recommendations.length > 0 && (
              <section id="section-recommendations">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-emerald-500" />购买推荐</h2>
                <div className="grid gap-4">{lesson.content.recommendations.map((rec, idx) => (<RecommendationCard key={idx} rec={rec} />))}</div>
              </section>
            )}
            {lesson.content.tools && lesson.content.tools.length > 0 && (
              <section id="section-tools">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">工具介绍</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{lesson.content.tools.map((tool, idx) => (<ToolCard key={idx} tool={tool} index={idx} />))}</div>
              </section>
            )}
            {lesson.content.commands && lesson.content.commands.length > 0 && (
              <section id="section-commands">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-indigo-500" />命令演示</h2>
                <div className="space-y-4">{lesson.content.commands.map((cmd, idx) => <CommandBlock key={idx} example={cmd} />)}</div>
              </section>
            )}
            <section id="section-mistakes">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-500" />常见错误排查</h2>
              <div>{lesson.content.commonMistakes.map((mistake, idx) => <MistakeCard key={idx} mistake={mistake} index={idx} />)}</div>
            </section>
            <section id="section-best-practices" className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border-2 border-green-200 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.2)]">
              <h2 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-green-600" />安全最佳实践</h2>
              <ul className="space-y-3">{lesson.content.bestPractices.map((practice, idx) => <li key={idx} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span className="text-green-900">{practice}</span></li>)}</ul>
            </section>
          </div>

          <div className="mt-6">
            <Quiz lessonId={lesson.id} />
          </div>

          <div className="mt-6">
            <NotesPanel lessonId={lesson.id} />
          </div>

          <LessonNav prevLesson={prev} nextLesson={next} />
        </motion.div>

        <aside className="hidden lg:block w-56 flex-shrink-0">
          <TableOfContents lesson={lesson} />
        </aside>
      </div>

      {/* Mobile TOC Floating Button */}
      {tocSections.length >= 3 && (
        <button
          onClick={() => setIsMobileTocOpen(true)}
          className="lg:hidden fixed bottom-20 right-4 z-40 w-10 h-10 bg-white border-2 border-indigo-200 text-indigo-600 rounded-full shadow-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
          aria-label="查看本节目录"
        >
          <List className="w-5 h-5" />
        </button>
      )}

      {/* Mobile TOC Bottom Sheet */}
      <AnimatePresence>
        {isMobileTocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMobileTocOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl max-h-[60vh] overflow-y-auto"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
              role="dialog"
              aria-modal="true"
              aria-label="本节目录"
            >
              <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">本节目录</h3>
                <button
                  onClick={() => setIsMobileTocOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="关闭目录"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <ul className="p-3 space-y-1">
                {tocSections.map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ScrollToTopButton />
    </div>
  );
};
