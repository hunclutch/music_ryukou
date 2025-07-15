'use client';

import { useState, useEffect } from 'react';
import { Song } from '@/types';
import { FavoritesService } from '@/services/favoritesService';

interface NotesModalProps {
  song: Song;
  onClose: () => void;
}

export function NotesModal({ song, onClose }: NotesModalProps) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const favoritesService = new FavoritesService();

  useEffect(() => {
    const favorite = favoritesService.getFavorite(song.id);
    if (favorite) {
      setNotes(favorite.notes);
    }
  }, [song.id]);

  const handleSave = () => {
    setLoading(true);
    
    if (!favoritesService.isFavorite(song.id)) {
      favoritesService.addFavorite(song, notes);
    } else {
      favoritesService.updateNotes(song.id, notes);
    }
    
    setLoading(false);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add Notes</h2>
          <div className="mt-2">
            <h3 className="font-medium text-gray-800">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Your notes about this song:
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
            placeholder="What do you think about this song? Add your thoughts here..."
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>
    </div>
  );
}