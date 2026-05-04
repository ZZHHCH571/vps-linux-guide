import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="text-8xl font-bold text-indigo-200 mb-4">404</div>
    <h1 className="text-2xl font-bold text-slate-800 mb-2">页面未找到</h1>
    <p className="text-slate-500 mb-8 max-w-md">
      你访问的页面不存在，可能已被移动或删除。
    </p>
    <div className="flex items-center gap-3">
      <Link
        to="/"
        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors font-medium"
      >
        <Home className="w-4 h-4" />
        返回首页
      </Link>
      <Link
        to="/"
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
      >
        <Search className="w-4 h-4" />
        浏览课程
      </Link>
    </div>
  </motion.div>
);
