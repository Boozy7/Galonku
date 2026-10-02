import React from 'react';
import { 
  ShieldCheck, 
  ArrowDownUp, 
  Check
} from 'lucide-react';
import { WaterType } from '../types';

export interface FilterState {
  onlyCertified: boolean;
  waterType: WaterType | 'all';
  minRating: number;
  sortBy: 'distance' | 'rating' | 'price' | 'lab_date';
  maxDistanceKm: number;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1">
      {/* Clean Minimal Pill Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {/* All filter */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              waterType: 'all',
              onlyCertified: false,
              minRating: 0,
            })
          }
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.waterType === 'all' && !filters.onlyCertified && filters.minRating === 0
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Semua
        </button>

        {/* Certified Dinkes */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              onlyCertified: !filters.onlyCertified,
            })
          }
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.onlyCertified
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${filters.onlyCertified ? 'bg-emerald-300' : 'bg-emerald-500'}`} />
          <span>Sertifikat Dinkes</span>
          {filters.onlyCertified && <Check className="w-3 h-3 ml-0.5" />}
        </button>

        {/* RO */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              waterType: filters.waterType === 'ro' ? 'all' : 'ro',
            })
          }
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.waterType === 'ro'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Reverse Osmosis (RO)
        </button>

        {/* Mineral */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              waterType: filters.waterType === 'mineral' ? 'all' : 'mineral',
            })
          }
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.waterType === 'mineral'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Air Mineral
        </button>

        {/* Alkali */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              waterType: filters.waterType === 'alkali' ? 'all' : 'alkali',
            })
          }
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.waterType === 'alkali'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Alkali
        </button>

        {/* 4.8+ */}
        <button
          onClick={() =>
            onFilterChange({
              ...filters,
              minRating: filters.minRating === 4.8 ? 0 : 4.8,
            })
          }
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 ${
            filters.minRating === 4.8
              ? 'bg-amber-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          ★ 4.8+
        </button>
      </div>

      {/* Sorting & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 shrink-0">
        <span className="text-[11px] text-slate-400">
          <b className="text-slate-700">{totalCount}</b> depot
        </span>

        <div className="flex items-center gap-1.5">
          <ArrowDownUp className="w-3 h-3 text-slate-400" />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sortBy: e.target.value as FilterState['sortBy'],
              })
            }
            className="bg-transparent border-none text-xs font-medium text-slate-700 focus:outline-none cursor-pointer hover:text-slate-900"
          >
            <option value="distance">Jarak Terdekat</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="price">Harga Termurah</option>
            <option value="lab_date">Uji Lab Terbaru</option>
          </select>
        </div>
      </div>
    </div>
  );
};
