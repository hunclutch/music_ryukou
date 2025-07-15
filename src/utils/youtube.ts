import { Song } from '@/types';

export function createYouTubeSearchUrl(song: Song): string {
  // Create optimized search query
  let query = `${song.title} ${song.artist}`;
  
  // Clean up the query for better search results
  let cleanQuery = query
    .replace(/[()（）]/g, '') // Remove parentheses
    .replace(/[【】\[\]]/g, '') // Remove brackets
    .replace(/feat\.?|ft\.?/gi, '') // Remove featuring indicators
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // Add specific terms for better Japanese music search
  if (isJapaneseText(cleanQuery)) {
    // Add "歌詞" (lyrics) or "MV" for better results
    cleanQuery += ' 歌詞';
  }
  
  // Encode for URL
  const encodedQuery = encodeURIComponent(cleanQuery);
  
  return `https://www.youtube.com/results?search_query=${encodedQuery}`;
}

function isJapaneseText(text: string): boolean {
  // Check if text contains Japanese characters (hiragana, katakana, kanji)
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

export function openYouTubeSearch(song: Song): void {
  const url = createYouTubeSearchUrl(song);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function createYouTubeMusicSearchUrl(song: Song): string {
  // Create search query for YouTube Music
  const query = `${song.title} ${song.artist}`;
  let cleanQuery = query
    .replace(/[()（）]/g, '')
    .replace(/[【】\[\]]/g, '')
    .replace(/feat\.?|ft\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // For YouTube Music, we don't add extra terms as it's more precise
  const encodedQuery = encodeURIComponent(cleanQuery);
  return `https://music.youtube.com/search?q=${encodedQuery}`;
}

export function openYouTubeMusicSearch(song: Song): void {
  const url = createYouTubeMusicSearchUrl(song);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function createAppleMusicSearchUrl(song: Song): string {
  const title = song.title
    .replace(/[()（）]/g, '')
    .replace(/[【】\[\]]/g, '')
    .replace(/feat\.?|ft\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const artist = song.artist
    .replace(/[()（）]/g, '')
    .replace(/[【】\[\]]/g, '')
    .replace(/feat\.?|ft\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // For Apple Music, encode title and artist separately with %20 for spaces
  let encodedTitle = '';
  for (let i = 0; i < title.length; i++) {
    const char = title[i];
    if (char === ' ') {
      encodedTitle += '%20';
    } else {
      encodedTitle += encodeURIComponent(char);
    }
  }
  
  let encodedArtist = '';
  for (let i = 0; i < artist.length; i++) {
    const char = artist[i];
    if (char === ' ') {
      encodedArtist += '%20';
    } else {
      encodedArtist += encodeURIComponent(char);
    }
  }
  
  return `https://music.apple.com/jp/search?term=${encodedTitle}%20${encodedArtist}`;
}

export function openAppleMusicSearch(song: Song): void {
  const url = createAppleMusicSearchUrl(song);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function createSpotifySearchUrl(song: Song): string {
  const query = `${song.title} ${song.artist}`;
  let cleanQuery = query
    .replace(/[()（）]/g, '')
    .replace(/[【】\[\]]/g, '')
    .replace(/feat\.?|ft\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Spotify uses spaces, not + for search terms
  const encodedQuery = encodeURIComponent(cleanQuery).replace(/%20/g, ' ');
  return `https://open.spotify.com/search/${encodedQuery}`;
}

export function openSpotifySearch(song: Song): void {
  const url = createSpotifySearchUrl(song);
  window.open(url, '_blank', 'noopener,noreferrer');
}