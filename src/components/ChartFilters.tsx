'use client';

import { useState } from 'react';

interface ChartFiltersProps {
  totalSongs: number;
  onFilter: (filter: { searchTerm: string; rankRange: [number, number] }) => void;
}

export function ChartFilters({ totalSongs, onFilter }: ChartFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [rankRange, setRankRange] = useState<[number, number]>([1, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilter({ searchTerm: value, rankRange });
  };

  const handleRankRangeChange = (range: [number, number]) => {
    setRankRange(range);
    onFilter({ searchTerm, rankRange: range });
  };

  const presetRanges = [
    { label: 'Top 10', range: [1, 10] as [number, number] },
    { label: 'Top 20', range: [1, 20] as [number, number] },
    { label: 'Top 50', range: [1, 50] as [number, number] },
    { label: 'All 100', range: [1, 100] as [number, number] },
  ];

  return (
    <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Filters {showFilters ? '▲' : '▼'}
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rank Range
            </label>
            <div className="flex flex-wrap gap-2">
              {presetRanges.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handleRankRangeChange(preset.range)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    rankRange[0] === preset.range[0] && rankRange[1] === preset.range[1]
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From rank
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={rankRange[0]}
                onChange={(e) => handleRankRangeChange([parseInt(e.target.value) || 1, rankRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To rank
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={rankRange[1]}
                onChange={(e) => handleRankRangeChange([rankRange[0], parseInt(e.target.value) || 100])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}