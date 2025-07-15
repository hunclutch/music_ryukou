'use client';

import { Song } from '@/types';

interface ChartSummaryProps {
  songs: Song[];
  filteredSongs: Song[];
}

export function ChartSummary({ songs, filteredSongs }: ChartSummaryProps) {
  const getRankGroups = (songList: Song[]) => {
    const groups = {
      '1-10': songList.filter(s => s.rank >= 1 && s.rank <= 10).length,
      '11-20': songList.filter(s => s.rank >= 11 && s.rank <= 20).length,
      '21-50': songList.filter(s => s.rank >= 21 && s.rank <= 50).length,
      '51-100': songList.filter(s => s.rank >= 51 && s.rank <= 100).length,
    };
    return groups;
  };

  const totalGroups = getRankGroups(songs);
  const filteredGroups = getRankGroups(filteredSongs);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">Chart Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        {Object.entries(totalGroups).map(([range, total]) => {
          const filtered = filteredGroups[range as keyof typeof filteredGroups];
          return (
            <div key={range} className="text-center">
              <div className="font-medium text-blue-800">Ranks {range}</div>
              <div className="text-blue-600">
                {filtered === total ? (
                  <span>{total} songs</span>
                ) : (
                  <span>{filtered} of {total}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-blue-700">
        Total: {filteredSongs.length} of {songs.length} songs displayed
        {songs.length === 100 && (
          <span className="ml-2 text-green-600">✓ Full Hot 100 loaded</span>
        )}
      </div>
    </div>
  );
}