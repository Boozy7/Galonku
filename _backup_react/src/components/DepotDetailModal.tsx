import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Navigation, 
  ExternalLink, 
  Check, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Depot, UserLocation } from '../types';
import { getGoogleMapsRouteUrl, formatRupiah, estimateTravelTime } from '../utils/distance';

interface DepotDetailModalProps {
  depot: Depot | null;
  userLocation: UserLocation;
  onClose: () => void;
  onOrderClick: (depot: Depot) => void;
  onWriteReviewClick: (depot: Depot) => void;
  onReportProblemClick: (depot: Depot) => void;
}

export const DepotDetailModal: React.FC<DepotDetailModalProps> = ({
  depot,
  userLocation,
  onClose,
  onOrderClick,
  onWriteReviewClick,
  onReportProblemClick,
}) => {
  if (!depot) return null;

  const isCertified = depot.certification.status === 'AKTIF';
  const travel = estimateTravelTime(depot.distanceKm || 1);
  const gmapUrl = getGoogleMapsRouteUrl(
    userLocation.lat,
    userLocation.lng,
    depot.lat,
    depot.lng,
    depot.name
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Banner with Image */}
        <div className="relative h-44 sm:h-52 shrink-0 bg-slate-900 overflow-hidden">
          <img
            src={depot.coverImage}
            alt={depot.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Bottom Title */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {isCertified ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600 text-white">
                      ● SLHS Dinkes Terverifikasi
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500 text-white">
                      ● Proses Renewal
                    </span>
                  )}
                  <span className="text-xs text-slate-300">
                    {depot.distanceKm} km (~{travel.motorMinutes} mnt)
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold">{depot.name}</h1>
                <p className="text-xs text-slate-300 truncate">{depot.tagline}</p>
              </div>

              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{depot.rating}</span>
                <span className="text-slate-300 font-normal">({depot.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{depot.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{depot.openHours}</span>
            </div>
            <a
              href={`https://wa.me/${depot.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Depot</span>
            </a>
          </div>

          {/* 2 Clean Cards: Dinkes & Lab Test */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Dinkes Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">
                  Sertifikat Laik Sehat (SLHS)
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Grade {depot.certification.grade?.split(' ')[0] || 'A'}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>No. Registrasi:</span>
                  <span className="font-mono text-slate-800 font-medium">{depot.certification.slhsNumber}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Penerbit:</span>
                  <span className="text-slate-700 truncate max-w-[170px]">{depot.certification.dinkesRegion}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Masa Berlaku:</span>
                  <span className="text-slate-800 font-medium">{depot.certification.expiryDate}</span>
                </div>
              </div>
            </div>

            {/* Lab Test Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">
                  Hasil Uji Laboratorium Air
                </span>
                <span className="text-[10px] text-slate-400">
                  {depot.labTest.lastTestedDate}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">TDS</div>
                  <div className="font-bold text-slate-900 text-sm">{depot.labTest.tds} <span className="text-[9px]">ppm</span></div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">pH</div>
                  <div className="font-bold text-slate-900 text-sm">{depot.labTest.ph}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">E. Coli</div>
                  <div className="font-bold text-emerald-700 text-xs mt-0.5">0 CFU</div>
                </div>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-2">
              Pilihan Air Isi Ulang
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {depot.products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-xl border border-slate-200/80 bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="font-medium text-xs text-slate-900">{prod.name}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{prod.description}</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-baseline justify-between text-xs">
                    <span className="text-slate-400">Harga:</span>
                    <span className="font-bold text-slate-900">{formatRupiah(prod.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-slate-900">
                Ulasan Kualitas Air ({depot.reviews.length})
              </h3>
              <button
                onClick={() => onWriteReviewClick(depot)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 transition"
              >
                + Beri Ulasan
              </button>
            </div>

            <div className="space-y-2">
              {depot.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{rev.userName}</span>
                    <div className="flex items-center gap-0.5 font-semibold text-slate-800">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {/* Direct Google Maps Route (User Request) */}
            <a
              href={gmapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              title="Buka Navigasi Rute Langsung di Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-600" />
              <span>Rute Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => onReportProblemClick(depot)}
              className="px-2.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
            >
              Laporkan Air
            </button>
          </div>

          <button
            onClick={() => onOrderClick(depot)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
          >
            Pesan Pickup
          </button>
        </div>
      </div>
    </div>
  );
};
