import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Menu, X, ChevronRight } from 'lucide-react';
import { stages } from '../data/stages';
import { lessons } from '../data/lessons';
import { getIcon } from '../data/icons';

interface MobileNavProps {
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-indigo-100 sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        role="navigation"
        aria-label="移动端导航"
      >
        <div className="flex items-center justify-around h-14 px-2">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isHome ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
            }`}
            aria-label="首页"
            aria-current={isHome ? 'page' : undefined}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">首页</span>
          </Link>
          <button
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors"
            aria-label="搜索课程"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">搜索</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors"
            aria-label="打开菜单"
            aria-expanded={isDrawerOpen}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">菜单</span>
          </button>
        </div>
      </nav>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] sm:hidden"
              onClick={closeDrawer}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-[70] shadow-2xl sm:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="导航菜单"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <span className="font-bold text-slate-800">导航</span>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="关闭菜单"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Home Link (if not on home) */}
                {!isHome && (
                  <Link
                    to="/"
                    onClick={closeDrawer}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors font-medium text-sm"
                  >
                    <Home className="w-4 h-4" />
                    返回首页
                  </Link>
                )}

                {/* Stage Navigation */}
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">课程阶段</p>
                  {stages.map(stage => {
                    const firstLessonId = stage.lessons[0];
                    const firstLesson = lessons.find(l => l.id === firstLessonId);
                    return (
                      <Link
                        key={stage.id}
                        to={firstLesson ? `/lesson/${firstLesson.id}` : '/'}
                        onClick={closeDrawer}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                          {getIcon(stage.icon, 'w-4 h-4')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{stage.title}</p>
                          <p className="text-xs text-slate-400 truncate">{stage.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
