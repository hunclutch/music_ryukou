'use client';

import { useState, useEffect } from 'react';
import { Song } from '@/types';
import { FavoritesService } from '@/services/favoritesService';

interface FavoriteButtonProps {
  song: Song;
}

export function FavoriteButton({ song }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoritesService = new FavoritesService();

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(song.id));
  }, [song.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesService.removeFavorite(song.id);
      setIsFavorite(false);
    } else {
      favoritesService.addFavorite(song);
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-400'
      }`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}