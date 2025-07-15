'use client';

import { useState, useEffect } from 'react';
import { Favorite } from '@/types';
import { FavoritesService } from '@/services/favoritesService';
import { openYouTubeSearch, openYouTubeMusicSearch } from '@/utils/youtube';

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
                  
                  {/* YouTube Buttons */}
                  <div className="flex items-center space-x-2">
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
                  </div>
                </div>
                
                {/* Notes Section */}
                <div className="mt-3">
                  {editingNote === favorite.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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