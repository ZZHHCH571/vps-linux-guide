import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  lessonId: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  lessonId,
  size = 'md',
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const favorite = isFavorite(lessonId);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleFavorite(lessonId)}
      aria-label={favorite ? '取消收藏' : '添加收藏'}
      aria-pressed={favorite}
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-colors ${
        favorite
          ? 'bg-red-100 text-red-500 hover:bg-red-200'
          : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-red-400'
      }`}
    >
      <motion.div
        animate={favorite ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Heart
          className={`${iconSizes[size]} ${favorite ? 'fill-current' : ''}`}
        />
      </motion.div>
    </motion.button>
  );
};
