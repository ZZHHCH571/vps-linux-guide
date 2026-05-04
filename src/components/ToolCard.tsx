import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';
import type { Tool } from '../data/types';

export const ToolCard: React.FC<{ tool: Tool; index: number }> = ({ tool, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-xl p-4 border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors flex-shrink-0">
        <Wrench className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 mb-1">{tool.name}</h4>
        <p className="text-sm text-slate-600 mb-2 leading-relaxed">{tool.description}</p>
        <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
          <ArrowRight className="w-3 h-3" />
          <span className="truncate">{tool.usage}</span>
        </div>
      </div>
    </div>
  </motion.div>
);
