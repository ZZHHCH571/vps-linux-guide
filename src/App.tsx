import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { Server, Home, Search } from 'lucide-react';
import { SearchModal } from './components/SearchModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileNav } from './components/MobileNav';
import { ToastProvider } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { lessons } from './data/lessons';
import type { Lesson } from './data/types';

const LessonPage = React.lazy(() => import('./pages/LessonPage').then(m => ({ default: m.LessonPage })));

function LessonLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
      <p className="text-slate-400 text-sm">加载课程中...</p>
    </div>
  );
}

// ============================================================
// Navigation
// ============================================================
const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <nav className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(79,70,229,0.3)]"><Server className="w-5 h-5" /></div>
              <span className="font-bold text-xl text-slate-800">VPS入门</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {!isHome && <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors font-medium"><Home className="w-4 h-4" />返回首页</Link>}
            </div>
          </div>
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} lessons={lessons} />
      <MobileNav onOpenSearch={() => setIsSearchOpen(true)} />
    </>
  );
};

// ============================================================
// LessonRoute
// ============================================================
const LessonRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lesson: Lesson | undefined = lessons.find(l => l.id === id);
  if (!lesson) return <div className="text-center py-20"><h2 className="text-2xl font-bold text-slate-800 mb-2">课程未找到</h2><Link to="/" className="text-indigo-500 hover:underline">返回首页</Link></div>;
  return <LessonPage lesson={lesson} />;
};

// ============================================================
// ScrollToTop - 路由切换时自动滚动到顶部
// ============================================================
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ============================================================
// App
// ============================================================
const AppContent: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <Navigation />
    <ScrollToTop />
    <main className="max-w-6xl mx-auto px-4 py-8 pb-20 sm:pb-8">
      <ErrorBoundary>
        <Suspense fallback={<LessonLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lesson/:id" element={<LessonRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </main>
    <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
      <p>Linux VPS入门教程 · 踩坑复盘 · 新手友好</p>
    </footer>
  </div>
);

const App: React.FC = () => (
  <BrowserRouter>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </BrowserRouter>
);

export default App;
