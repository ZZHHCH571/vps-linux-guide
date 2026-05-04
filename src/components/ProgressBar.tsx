import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  percent: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, label }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.15)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">学习进度</h3>
            {label && <p className="text-sm text-slate-500">{label}</p>}
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-indigo-600">{percent}%</span>
        </div>
      </div>

      <div
        className="relative h-3 bg-slate-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`学习进度 ${percent}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>

      {percent === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200"
        >
          <p className="text-sm text-green-700 font-medium text-center">
            恭喜！你已经完成了所有课程
          </p>
        </motion.div>
      )}
    </div>
  );
};
