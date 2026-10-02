import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Depot, UserLocation } from '../types';
import { getGoogleMapsRouteUrl, estimateTravelTime, formatRupiah } from '../utils/distance';
import { Navigation, ExternalLink, ChevronRight } from 'lucide-react';

interface DepotMapProps {
  depots: Depot[];
  userLocation: UserLocation;
  selectedDepot: Depot | null;
  onSelectDepot: (depot: Depot) => void;
  onOrderDepot: (depot: Depot) => void;
  onViewDetail: (depot: Depot) => void;
  onDetectGPS?: () => void;
  isLocating?: boolean;
}

export const DepotMap: React.FC<DepotMapProps> = ({
  depots,
  userLocation,
  selectedDepot,
  onSelectDepot,
  onOrderDepot,
  onViewDetail,
  onDetectGPS,
  isLocating,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);
  const accuracyCircleRef = useRef<L.Circle | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 14,
        zoomControl: false,
      });

      // OpenStreetMap Official Free Tile Layer (100% Free, No Watermark, No API Key Required)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }
  }, []);

  // Update User Location Marker & GPS Accuracy Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }
    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.remove();
      accuracyCircleRef.current = null;
    }

    // Accuracy Circle if real GPS
    if (userLocation.accuracy && userLocation.accuracy > 0) {
      const circle = L.circle([userLocation.lat, userLocation.lng], {
        radius: Math.min(userLocation.accuracy, 250),
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.15,
        weight: 1,
      }).addTo(map);
      accuracyCircleRef.current = circle;
    }

    const userIcon = L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-sky-400/30 user-gps-marker"></div>
          <div class="w-4 h-4 rounded-full bg-slate-900 border-2 border-white shadow-md"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
    userMarkerRef.current = marker;

    if (!selectedDepot) {
      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1.2 });
    }
  }, [userLocation]);

  // Update Depot Markers with Clean Airbnb / Apple-Style Pills
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    depots.forEach((depot) => {
      const isSelected = selectedDepot?.id === depot.id;
      const isCertified = depot.certification.status === 'AKTIF';
      const lowestPrice = Math.min(...depot.products.map((p) => p.price));
      const priceText = `${Math.round(lowestPrice / 1000)}rb`;

      const iconHtml = `
        <div class="custom-depot-pin flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md transition-transform cursor-pointer ${
          isSelected
            ? 'bg-slate-900 text-white scale-110 ring-2 ring-slate-900/20'
            : 'bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50'
        }">
          <span class="w-2 h-2 rounded-full ${isCertified ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
          <span>${priceText}</span>
          <span class="text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}">★${depot.rating}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'bg-transparent',
        html: iconHtml,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const marker = L.marker([depot.lat, depot.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectDepot(depot);
      });

      markersRef.current[depot.id] = marker;
    });
  }, [depots, selectedDepot, userLocation]);

  // Route Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    if (selectedDepot) {
      const line = L.polyline(
        [
          [userLocation.lat, userLocation.lng],
          [selectedDepot.lat, selectedDepot.lng],
        ],
        {
          color: '#0f172a',
          weight: 3,
          opacity: 0.7,
          dashArray: '6, 6',
        }
      ).addTo(map);

      routeLineRef.current = line;

      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [selectedDepot.lat, selectedDepot.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    }
  }, [selectedDepot, userLocation]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100">
      <div ref={mapContainerRef} className="w-full h-full min-h-[400px] lg:min-h-full" />

      {/* Clean Minimalist Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-slate-200/80 text-[11px] flex items-center gap-3">
        <div className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Dinkes SLHS</span>
        </div>
        <div className="flex items-center gap-1 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Renewal</span>
        </div>
      </div>

      {/* Floating GPS Locate Button on Map */}
      {onDetectGPS && (
        <button
          onClick={onDetectGPS}
          disabled={isLocating}
          className="absolute top-3 left-3 z-[1000] bg-white hover:bg-slate-50 text-slate-800 px-3 py-1.5 rounded-full shadow-md border border-slate-200/80 transition flex items-center gap-1.5 text-xs font-semibold"
          title="Pusatkan dan Cari Depot di Sekitar GPS Riil Saya"
        >
          <Navigation className={`w-3.5 h-3.5 text-sky-600 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Mencari Sinyal GPS...' : 'GPS Saya'}</span>
        </button>
      )}

      {/* Clean Floating Card when Depot is selected */}
      {selectedDepot && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80 w-full sm:w-80 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-slate-900 truncate">
                {selectedDepot.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedDepot.distanceKm} km • ~{estimateTravelTime(selectedDepot.distanceKm || 1).motorMinutes} mnt
              </p>
            </div>

            {/* Direct Google Maps button */}
            <a
              href={getGoogleMapsRouteUrl(
                userLocation.lat,
                userLocation.lng,
                selectedDepot.lat,
                selectedDepot.lng,
                selectedDepot.name
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition shrink-0"
              title="Buka di Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-700" />
              <span>GMap</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => onViewDetail(selectedDepot)}
              className="flex-1 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              Detail
            </button>
            <button
              onClick={() => onOrderDepot(selectedDepot)}
              className="flex-1 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
            >
              Pesan Pickup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
