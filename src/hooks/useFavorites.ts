import { useState, useCallback } from 'react';

const FAVORITES_KEY = 'vps_guide_favorites';

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites());

  const isFavorite = useCallback(
    (lessonId: string) => favorites.includes(lessonId),
    [favorites]
  );

  const toggleFavorite = useCallback((lessonId: string) => {
    setFavorites(prev => {
      const next = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      saveFavorites(next);
      return next;
    });
  }, []);

  return { favorites, error: null, isFavorite, toggleFavorite, loading: false };
}
