import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch, SearchableLesson } from '../hooks/useSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: SearchableLesson[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lessons,
}) => {
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useSearch(lessons);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    clearSearch();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="搜索课程"
          >
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜索课程、命令、术语..."
                  className="flex-1 text-lg outline-none text-slate-800 placeholder:text-slate-400"
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className="p-8 text-center text-slate-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>输入关键词搜索课程、命令或术语</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <p>未找到与 "{searchQuery}" 相关的内容</p>
                </div>
              ) : (
                <div className="p-2">
                  {searchResults.map(({ lesson, matches }) => (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      onClick={handleClose}
                      className="block p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {lesson.description}
                          </p>
                          {matches.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {matches.slice(0, 2).map((match, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded"
                                >
                                  <span className="font-medium text-indigo-500">
                                    {match.type === 'title' && '标题'}
                                    {match.type === 'description' && '描述'}
                                    {match.type === 'content' && '内容'}
                                    {match.type === 'term' && '术语'}
                                    {match.type === 'command' && '命令'}
                                    ：
                                  </span>
                                  <span className="ml-1">{match.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
