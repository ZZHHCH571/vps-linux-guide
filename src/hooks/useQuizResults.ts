import { useState, useCallback } from 'react';

const QUIZ_KEY_PREFIX = 'vps_guide_quiz_';

interface QuizResult {
  score: number;
  total: number;
}

function loadBestScore(lessonId: string): QuizResult | null {
  try {
    const raw = localStorage.getItem(QUIZ_KEY_PREFIX + lessonId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useQuizResults(lessonId: string) {
  const [bestScore, setBestScore] = useState<QuizResult | null>(
    () => loadBestScore(lessonId)
  );

  const saveScore = useCallback((score: number, total: number) => {
    setBestScore(prev => {
      if (!prev || score > prev.score) {
        const next = { score, total };
        localStorage.setItem(QUIZ_KEY_PREFIX + lessonId, JSON.stringify(next));
        return next;
      }
      return prev;
    });
    return true;
  }, [lessonId]);

  return { bestScore, saveScore, loading: false };
}
