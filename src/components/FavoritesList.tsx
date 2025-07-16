'use client';

import { useState, useEffect } from 'react';
import { Favorite } from '@/types';
import { FavoritesService } from '@/services/favoritesService';
import { openYouTubeSearch, openYouTubeMusicSearch, openAppleMusicSearch, openSpotifySearch } from '@/utils/youtube';

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const favoritesService = new FavoritesService();

  useEffect(() => {
    const loadFavorites = () => {
      const userFavorites = favoritesService.getFavorites();
      setFavorites(userFavorites);
      setLoading(false);
    };

    loadFavorites();
    
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFavorite = (songId: string) => {
    favoritesService.removeFavorite(songId);
    setFavorites(prev => prev.filter(fav => fav.songId !== songId));
  };

  const handleYouTubeSearch = (favorite: Favorite) => {
    openYouTubeSearch(favorite.song);
  };

  const handleYouTubeMusicSearch = (favorite: Favorite) => {
    openYouTubeMusicSearch(favorite.song);
  };

  const handleAppleMusicSearch = (favorite: Favorite) => {
    openAppleMusicSearch(favorite.song);
  };

  const handleSpotifySearch = (favorite: Favorite) => {
    openSpotifySearch(favorite.song);
  };

  const startEditingNote = (favorite: Favorite) => {
    setEditingNote(favorite.id);
    setEditingText(favorite.notes);
  };

  const saveNote = (songId: string) => {
    favoritesService.updateNotes(songId, editingText);
    setFavorites(prev => prev.map(fav => 
      fav.songId === songId ? { ...fav, notes: editingText } : fav
    ));
    setEditingNote(null);
    setEditingText('');
  };

  const cancelEditingNote = () => {
    setEditingNote(null);
    setEditingText('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Loading favorites...</div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No favorites yet</p>
          <p className="text-gray-400 mt-2">Add songs to your favorites from the charts to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      
      <div className="space-y-4">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{favorite.song.title}</h3>
                    <p className="text-gray-600">{favorite.song.artist}</p>
                    <p className="text-sm text-gray-400">
                      Added on {new Date(favorite.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Music Service Buttons */}
                  <div className="flex items-center space-x-1 flex-wrap gap-y-1">
                    <button
                      onClick={() => handleYouTubeSearch(favorite)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-1"
                      title="YouTubeで検索"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="hidden sm:inline">YouTube</span>
                    </button>
                    <button
                      onClick={() => handleYouTubeMusicSearch(favorite)}
                      className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors flex items-center gap-1"
                      title="YouTube Musicで検索"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                      <span className="hidden sm:inline">Music</span>
                    </button>
                    <button
                      onClick={() => handleAppleMusicSearch(favorite)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
                      title="Apple Musicで検索"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                      </svg>
                      <span className="hidden sm:inline">Apple</span>
                    </button>
                    <button
                      onClick={() => handleSpotifySearch(favorite)}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center gap-1"
                      title="Spotifyで検索"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      <span className="hidden sm:inline">Spotify</span>
                    </button>
                  </div>
                </div>
                
                {/* Notes Section */}
                <div className="mt-3">
                  {editingNote === favorite.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
                        rows={3}
                        placeholder="Add your notes about this song..."
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={cancelEditingNote}
                          className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveNote(favorite.songId)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md relative group">
                      {favorite.notes ? (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap pr-8">{favorite.notes}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No notes yet. Click to add notes.</p>
                      )}
                      <button
                        onClick={() => startEditingNote(favorite)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit notes"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => removeFavorite(favorite.songId)}
                className="ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Remove from favorites"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}