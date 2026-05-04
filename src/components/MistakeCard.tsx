import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import type { Mistake } from '../data/types';

export const MistakeCard: React.FC<{ mistake: Mistake; index: number }> = ({ mistake, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3 bg-white rounded-2xl shadow-[3px_3px_0px_0px_rgba(239,68,68,0.15)] border-2 border-red-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-red-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-sm">
            {index + 1}
          </div>
          <span className="font-medium text-slate-700">{mistake.error}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-red-100"
          >
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-700">原因：</span>
                  <span className="text-slate-600">{mistake.cause}</span>
                </div>
              </div>
              {mistake.expectedResult && (
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-700">预期现象：</span>
                    <span className="text-slate-600">{mistake.expectedResult}</span>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-700">解决：</span>
                  <span className="text-slate-600">{mistake.solution}</span>
                </div>
              </div>
              {mistake.recoveryMethod && (
                <div className="flex gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-700">恢复方法：</span>
                    <span className="text-slate-600">{mistake.recoveryMethod}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
