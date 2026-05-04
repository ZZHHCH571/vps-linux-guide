import { useState, useCallback } from 'react';

const PROGRESS_KEY = 'vps_guide_progress';

interface ProgressData {
  [lessonId: string]: {
    completed: boolean;
    lastAccessed: string;
  };
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: ProgressData): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());

  const upsertProgress = useCallback((lessonId: string, completed: boolean) => {
    const now = new Date().toISOString();
    setProgress(prev => {
      const next = {
        ...prev,
        [lessonId]: { completed, lastAccessed: now },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const markComplete = useCallback(
    (lessonId: string) => upsertProgress(lessonId, true),
    [upsertProgress]
  );

  const markIncomplete = useCallback(
    (lessonId: string) => upsertProgress(lessonId, false),
    [upsertProgress]
  );

  const isCompleted = useCallback(
    (lessonId: string) => progress[lessonId]?.completed || false,
    [progress]
  );

  const getCompletedCount = useCallback(
    () => Object.values(progress).filter(p => p.completed).length,
    [progress]
  );

  return {
    progress,
    error: null,
    savingState: {} as Record<string, boolean>,
    markComplete,
    markIncomplete,
    isCompleted,
    getCompletedCount,
    loading: false,
  };
}
