import React from 'react';
import { 
  Droplet, 
  MapPin, 
  Search, 
  ShoppingBag, 
  AlertCircle,
  ChevronDown,
  Compass,
  Check
} from 'lucide-react';
import { UserLocation, PickupOrder } from '../types';
import { HOTSPOT_LOCATIONS } from '../data/mockDepots';

interface NavbarProps {
  userLocation: UserLocation;
  onSelectLocation: (loc: { lat: number; lng: number; label: string }) => void;
  onDetectGPS: () => void;
  isLocating?: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeOrders: PickupOrder[];
  onOpenOrderTracker: () => void;
  onOpenComplaintModal: () => void;
  viewMode: 'split' | 'list' | 'map';
  onChangeViewMode: (mode: 'split' | 'list' | 'map') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userLocation,
  onSelectLocation,
  onDetectGPS,
  isLocating,
  searchQuery,
  onSearchChange,
  activeOrders,
  onOpenOrderTracker,
  onOpenComplaintModal,
  viewMode,
  onChangeViewMode,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);

  const pendingOrders = activeOrders.filter(
    (o) => o.status === 'DITERIMA' || o.status === 'SEDANG_DIISI' || o.status === 'SIAP_DIAMBIL'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70">
      <div className="w-full px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Minimal Clean Brand Logo & Location Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
              <Droplet className="w-4 h-4 fill-sky-400 text-sky-400" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Minum<span className="text-sky-500">.in</span>
              </span>
            </div>
          </div>

          {/* Direct GPS Button */}
          <button
            onClick={onDetectGPS}
            disabled={isLocating}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
              userLocation.isCustomGps
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
            }`}
            title="Deteksi posisi GPS perangkat Anda sekarang"
          >
            <span className={`w-2 h-2 rounded-full ${userLocation.isCustomGps ? 'bg-emerald-500' : 'bg-sky-500'} ${isLocating ? 'animate-ping' : ''}`} />
            <span>{isLocating ? 'Mencari GPS...' : userLocation.isCustomGps ? 'GPS Aktif' : 'Gunakan GPS'}</span>
          </button>

          {/* Location Selector Pill */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="max-w-[140px] truncate">{userLocation.label.split('(')[0].trim()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLocationDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Pilih Wilayah Surabaya
                </div>
                {HOTSPOT_LOCATIONS.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                      userLocation.label === loc.label
                        ? 'bg-slate-900 text-white font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{loc.label}</span>
                    {userLocation.label === loc.label && <Check className="w-3.5 h-3.5 ml-2 shrink-0" />}
                  </button>
                ))}

                <div className="p-1 border-t border-slate-100 mt-1">
                  <button
                    onClick={() => {
                      onDetectGPS();
                      setShowLocationDropdown(false);
                    }}
                    disabled={isLocating}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 text-sky-700 hover:bg-sky-50 font-semibold transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                    <span>{isLocating ? 'Mendeteksi GPS...' : 'Deteksi GPS Riil Saya Otomatis'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Clean Search Bar */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari depot air, wilayah, atau jenis air (RO, Mineral)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100/80 focus:bg-white border border-transparent focus:border-slate-300 rounded-full text-xs text-slate-800 placeholder-slate-400 transition outline-none focus:ring-2 focus:ring-slate-900/5"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: View Mode Toggle & Subtle Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* View Mode Segmented Control (Laptop only) */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-0.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/60">
            <button
              onClick={() => onChangeViewMode('split')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'split' ? 'bg-white shadow-sm text-slate-900 font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => onChangeViewMode('list')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'list' ? 'bg-white shadow-sm text-slate-900 font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Daftar
            </button>
            <button
              onClick={() => onChangeViewMode('map')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'map' ? 'bg-white shadow-sm text-slate-900 font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Peta
            </button>
          </div>

          {/* Lapor Masalah Air button */}
          <button
            onClick={onOpenComplaintModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
            title="Laporkan Masalah Kualitas Air"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lapor Air</span>
          </button>

          {/* Antrean Pickup Button */}
          <button
            onClick={onOpenOrderTracker}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Antrean</span>
            {pendingOrders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-sky-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {pendingOrders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar for Mobile view */}
      <div className="px-4 pb-2.5 sm:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari depot, RO, Mineral..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-800 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
