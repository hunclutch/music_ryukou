export interface Song {
  id: string;
  title: string;
  artist: string;
  rank: number;
  lastWeekRank?: number;
  peakRank?: number;
  weeksOnChart?: number;
  salesData?: string;
  totalPoints?: number;
}

export interface ChartData {
  chartName: string;
  date: string;
  songs: Song[];
  publishDate?: string;
  lastWeekDate?: string;
  nextWeekDate?: string;
}

export interface Favorite {
  id: string;
  songId: string;
  song: Song;
  notes: string;
  dateAdded: string;
}