import { Favorite, Song } from '@/types';

export class FavoritesService {
  private storageKey = 'music-ryukou-favorites';

  getFavorites(): Favorite[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  addFavorite(song: Song, notes: string = ''): Favorite {
    const favorite: Favorite = {
      id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      songId: song.id,
      song,
      notes,
      dateAdded: new Date().toISOString(),
    };

    const favorites = this.getFavorites();
    const existingIndex = favorites.findIndex(f => f.songId === song.id);
    
    if (existingIndex >= 0) {
      favorites[existingIndex] = favorite;
    } else {
      favorites.push(favorite);
    }

    this.saveFavorites(favorites);
    return favorite;
  }

  removeFavorite(songId: string): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.songId !== songId);
    this.saveFavorites(filtered);
  }

  updateNotes(songId: string, notes: string): void {
    const favorites = this.getFavorites();
    const favorite = favorites.find(f => f.songId === songId);
    
    if (favorite) {
      favorite.notes = notes;
      this.saveFavorites(favorites);
    }
  }

  isFavorite(songId: string): boolean {
    return this.getFavorites().some(f => f.songId === songId);
  }

  getFavorite(songId: string): Favorite | undefined {
    return this.getFavorites().find(f => f.songId === songId);
  }

  private saveFavorites(favorites: Favorite[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }
}