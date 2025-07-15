'use client';

import { useState } from 'react';
import { Song } from '@/types';
import { FavoritesService } from '@/services/favoritesService';
import { FavoriteButton } from './FavoriteButton';
import { NotesModal } from './NotesModal';
import { openYouTubeSearch, openYouTubeMusicSearch } from '@/utils/youtube';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const favoritesService = new FavoritesService();

  const handleNotesClick = () => {
    setShowNotes(true);
  };

  const handleYouTubeSearch = () => {
    openYouTubeSearch(song);
  };

  const handleYouTubeMusicSearch = () => {
    openYouTubeMusicSearch(song);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1">
            <div className="flex-shrink-0">
              <span className={`text-xl sm:text-2xl font-bold ${
                song.rank <= 10 ? 'text-yellow-500' : 
                song.rank <= 20 ? 'text-gray-700' : 
                'text-gray-400'
              }`}>
                #{song.rank}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-2">{song.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 truncate pr-2">{song.artist}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-500">
                {song.lastWeekRank && (
                  <span className="flex items-center">
                    <span className="hidden sm:inline">Last week: </span>
                    <span className="sm:hidden">Last: </span>
                    #{song.lastWeekRank}
                    {song.lastWeekRank > song.rank && (
                      <span className="text-green-600 ml-1">↗</span>
                    )}
                    {song.lastWeekRank < song.rank && (
                      <span className="text-red-600 ml-1">↘</span>
                    )}
                    {song.lastWeekRank === song.rank && (
                      <span className="text-gray-400 ml-1">→</span>
                    )}
                  </span>
                )}
                {song.weeksOnChart && (
                  <span>{song.weeksOnChart} weeks</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={handleYouTubeSearch}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1"
                title="YouTubeで検索"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="hidden sm:inline">YouTube</span>
              </button>
              <button
                onClick={handleYouTubeMusicSearch}
                className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors flex items-center gap-1"
                title="YouTube Musicで検索"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span className="hidden sm:inline">Music</span>
              </button>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={handleNotesClick}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Notes
              </button>
              <FavoriteButton song={song} />
            </div>
          </div>
        </div>
      </div>

      {showNotes && (
        <NotesModal
          song={song}
          onClose={() => setShowNotes(false)}
        />
      )}
    </>
  );
}