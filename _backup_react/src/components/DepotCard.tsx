import React from 'react';
import { 
  Star, 
  Navigation, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Depot, UserLocation } from '../types';
import { estimateTravelTime, getGoogleMapsRouteUrl, formatRupiah } from '../utils/distance';

interface DepotCardProps {
  depot: Depot;
  userLocation: UserLocation;
  isSelected?: boolean;
  onSelect: () => void;
  onOrderClick: () => void;
  onViewDetail: () => void;
}

export const DepotCard: React.FC<DepotCardProps> = ({
  depot,
  userLocation,
  isSelected,
  onSelect,
  onOrderClick,
  onViewDetail,
}) => {
  const travel = estimateTravelTime(depot.distanceKm || 1);
  const lowestPrice = Math.min(...depot.products.map((p) => p.price));
  const isCertified = depot.certification.status === 'AKTIF';
  const gmapUrl = getGoogleMapsRouteUrl(
    userLocation.lat,
    userLocation.lng,
    depot.lat,
    depot.lng,
    depot.name
  );

  return (
    <div
      onClick={onSelect}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer p-4 ${
        isSelected
          ? 'border-slate-900 shadow-sm ring-1 ring-slate-900/10'
          : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Clean Image with single subtle status tag */}
        <div className="relative w-full sm:w-36 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <img
            src={depot.coverImage}
            alt={depot.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Minimal status tag */}
          <div className="absolute top-2 left-2">
            {isCertified ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-sm text-emerald-800 shadow-sm border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                SLHS Dinkes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/95 backdrop-blur-sm text-amber-800 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Perpanjangan
              </span>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Top row: Name & Star Rating */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 text-base truncate group-hover:text-sky-600 transition">
                  {depot.name}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {depot.district} • {depot.distanceKm} km (~{travel.motorMinutes} mnt)
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-slate-800 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{depot.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({depot.reviewCount})</span>
              </div>
            </div>

            {/* Clean Specifications Line (TDS, pH, E. coli) */}
            <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <span className="text-slate-400 text-[11px]">TDS</span>
                <span className="font-medium text-slate-800">{depot.labTest.tds} ppm</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-slate-400 text-[11px]">pH</span>
                <span className="font-medium text-slate-800">{depot.labTest.ph}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-medium text-[11px]">
                0 E. Coli
              </span>
            </div>
          </div>

          {/* Bottom row: Price & Streamlined Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-400">Mulai</span>
              <span className="text-sm font-bold text-slate-900 ml-1">
                {formatRupiah(lowestPrice)}
              </span>
              <span className="text-[11px] text-slate-400 ml-0.5">/galon</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Direct GMap Route button (Sleek minimalist style) */}
              <a
                href={gmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200/80"
                title="Buka Rute Langsung di Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-600" />
                <span>Rute GMap</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {/* Detail Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetail();
                }}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                Detail
              </button>

              {/* Order Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOrderClick();
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm"
              >
                Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
