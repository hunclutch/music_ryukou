'use client';

import { useState } from 'react';
import { Song } from '@/types';
import { FavoritesService } from '@/services/favoritesService';
import { FavoriteButton } from './FavoriteButton';
import { NotesModal } from './NotesModal';
import { openYouTubeSearch, openYouTubeMusicSearch, openAppleMusicSearch, openSpotifySearch } from '@/utils/youtube';

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

  const handleAppleMusicSearch = () => {
    openAppleMusicSearch(song);
  };

  const handleSpotifySearch = () => {
    openSpotifySearch(song);
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
            <div className="flex items-center space-x-1 flex-wrap gap-y-1">
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
              <button
                onClick={handleAppleMusicSearch}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
                title="Apple Musicで検索"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                <span className="hidden sm:inline">Apple</span>
              </button>
              <button
                onClick={handleSpotifySearch}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center gap-1"
                title="Spotifyで検索"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="hidden sm:inline">Spotify</span>
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