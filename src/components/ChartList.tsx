'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChartData, Song } from '@/types';
import { BillboardService } from '@/services/billboardService';
import { SongCard } from './SongCard';
import { ChartFilters } from './ChartFilters';
import { ChartSummary } from './ChartSummary';
import { ScrollToTop } from './ScrollToTop';
import { DataSourceInfo } from './DataSourceInfo';

export function ChartList() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    rankRange: [1, 100] as [number, number],
  });

  const billboardService = new BillboardService();

  const filteredSongs = useMemo(() => {
    if (!chartData) return [];

    const filtered = chartData.songs.filter((song: Song) => {
      const matchesSearch = filters.searchTerm === '' || 
        song.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesRank = song.rank >= filters.rankRange[0] && song.rank <= filters.rankRange[1];
      
      return matchesSearch && matchesRank;
    });

    // Sort by rank to ensure proper order
    filtered.sort((a, b) => a.rank - b.rank);
    
    // Debug log to check ranking order
    if (filtered.length > 0) {
      console.log('Filtered songs ranking check:', {
        firstFive: filtered.slice(0, 5).map(s => `#${s.rank}: ${s.title}`),
        total: filtered.length,
        ranks: filtered.map(s => s.rank).slice(0, 10)
      });
    }
    
    return filtered;
  }, [chartData, filters]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);
        const data = await billboardService.getHot100();
        setChartData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load charts');
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Loading charts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div>No chart data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{chartData.chartName}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
          <p>Chart date: {chartData.date}</p>
          {chartData.publishDate && chartData.publishDate !== chartData.date && (
            <p>• Published: {chartData.publishDate}</p>
          )}
          <p className="ml-auto text-sm">
            Showing {filteredSongs.length} of {chartData.songs.length} songs
          </p>
        </div>
      </div>
      
      <DataSourceInfo />
      
      <ChartSummary 
        songs={chartData.songs}
        filteredSongs={filteredSongs}
      />
      
      <ChartFilters 
        totalSongs={chartData.songs.length}
        onFilter={setFilters}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {filteredSongs.map((song, index) => (
          <SongCard key={`${song.id}-${index}-${song.rank}`} song={song} />
        ))}
      </div>
      
      {filteredSongs.length === 0 && filters.searchTerm && (
        <div className="mt-8 text-center text-gray-500">
          <p>No songs found matching "{filters.searchTerm}"</p>
        </div>
      )}
      
      {filteredSongs.length > 0 && filteredSongs.length < chartData.songs.length && (
        <div className="mt-8 text-center text-gray-500">
          <p>Showing filtered results • Total: {chartData.songs.length} songs</p>
        </div>
      )}
      
      {filteredSongs.length === chartData.songs.length && chartData.songs.length >= 50 && (
        <div className="mt-8 text-center text-gray-500">
          <p>End of Billboard Japan Hot 100</p>
        </div>
      )}
      
      <ScrollToTop />
    </div>
  );
}