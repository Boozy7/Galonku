import React, { useState, useEffect, useMemo } from 'react';
import { 
  MOCK_DEPOTS, 
  INITIAL_USER_LOCATION, 
  INITIAL_ORDERS 
} from './data/mockDepots';
import { 
  Depot, 
  UserLocation, 
  PickupOrder, 
  OrderStatus, 
  ReviewItem, 
  ComplaintReport 
} from './types';
import { calculateDistance } from './utils/distance';
import { generateDepotsNearCoordinates } from './utils/gpsDepotGenerator';

import { Navbar } from './components/Navbar';
import { FilterBar, FilterState } from './components/FilterBar';
import { DepotCard } from './components/DepotCard';
import { DepotMap } from './components/DepotMap';
import { DepotDetailModal } from './components/DepotDetailModal';
import { PickupOrderModal } from './components/PickupOrderModal';
import { ActiveOrderTracker } from './components/ActiveOrderTracker';
import { ReviewModal } from './components/ReviewModal';
import { ComplaintReportModal } from './components/ComplaintReportModal';

export const App: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);

  const [userLocation, setUserLocation] = useState<UserLocation>(() => {
    const saved = localStorage.getItem('minumin_user_location');
    if (saved && !saved.includes('Jakarta')) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_USER_LOCATION;
  });

  const [depots, setDepots] = useState<Depot[]>(() => {
    const saved = localStorage.getItem('minumin_depots_data');
    if (saved && saved.includes('Surabaya')) {
      try { return JSON.parse(saved); } catch {}
    }
    return MOCK_DEPOTS;
  });

  const [orders, setOrders] = useState<PickupOrder[]>(() => {
    const saved = localStorage.getItem('minumin_pickup_orders');
    if (saved && saved.includes('SBY')) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_ORDERS;
  });

  const [complaints, setComplaints] = useState<ComplaintReport[]>(() => {
    const saved = localStorage.getItem('minumin_complaints');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    onlyCertified: false,
    waterType: 'all',
    minRating: 0,
    sortBy: 'distance',
    maxDistanceKm: 15,
  });

  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [selectedDepot, setSelectedDepot] = useState<Depot | null>(null);

  // Modals
  const [detailModalDepot, setDetailModalDepot] = useState<Depot | null>(null);
  const [orderModalDepot, setOrderModalDepot] = useState<Depot | null>(null);
  const [reviewModalDepot, setReviewModalDepot] = useState<Depot | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [complaintTargetDepot, setComplaintTargetDepot] = useState<Depot | null>(null);

  useEffect(() => {
    localStorage.setItem('minumin_user_location', JSON.stringify(userLocation));
  }, [userLocation]);

  useEffect(() => {
    localStorage.setItem('minumin_depots_data', JSON.stringify(depots));
  }, [depots]);

  useEffect(() => {
    localStorage.setItem('minumin_pickup_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('minumin_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const depotsWithDistance = useMemo(() => {
    return depots.map((d) => {
      const dist = calculateDistance(userLocation.lat, userLocation.lng, d.lat, d.lng);
      return {
        ...d,
        distanceKm: dist,
      };
    });
  }, [depots, userLocation]);

  const filteredDepots = useMemo(() => {
    return depotsWithDistance
      .filter((d) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = d.name.toLowerCase().includes(q);
          const matchDistrict = d.district.toLowerCase().includes(q);
          const matchCity = d.city.toLowerCase().includes(q);
          const matchTagline = d.tagline.toLowerCase().includes(q);
          const matchProducts = d.products.some((p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));
          if (!matchName && !matchDistrict && !matchCity && !matchTagline && !matchProducts) {
            return false;
          }
        }

        if (filters.onlyCertified && d.certification.status !== 'AKTIF') {
          return false;
        }

        if (filters.waterType !== 'all') {
          const hasType = d.products.some((p) => p.type === filters.waterType);
          if (!hasType) return false;
        }

        if (filters.minRating > 0 && d.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'distance') {
          return (a.distanceKm || 0) - (b.distanceKm || 0);
        }
        if (filters.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (filters.sortBy === 'price') {
          const minPriceA = Math.min(...a.products.map((p) => p.price));
          const minPriceB = Math.min(...b.products.map((p) => p.price));
          return minPriceA - minPriceB;
        }
        if (filters.sortBy === 'lab_date') {
          return b.labTest.lastTestedDate.localeCompare(a.labTest.lastTestedDate);
        }
        return 0;
      });
  }, [depotsWithDistance, searchQuery, filters]);

  const handleSelectLocation = (loc: { lat: number; lng: number; label: string }) => {
    setUserLocation({
      lat: loc.lat,
      lng: loc.lng,
      label: loc.label,
      isCustomGps: false,
      accuracy: undefined,
    });
    setDepots(MOCK_DEPOTS);
    setSelectedDepot(null);
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Peramban Anda tidak mendukung sensor Geolocation / GPS.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        let districtName = 'Sekitar Anda';
        let cityName = 'Surabaya';

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=15`,
            { headers: { 'Accept-Language': 'id' } }
          );
          if (res.ok) {
            const data = await res.json();
            districtName =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.village ||
              data.address?.road ||
              'Sekitar Anda';
            cityName =
              data.address?.city ||
              data.address?.regency ||
              data.address?.town ||
              'Surabaya';
          }
        } catch (err) {
          console.warn('Reverse geocode error, using default label:', err);
        }

        const newLoc: UserLocation = {
          lat: latitude,
          lng: longitude,
          label: `${districtName}, ${cityName} (GPS Riil)`,
          isCustomGps: true,
          accuracy: Math.round(accuracy),
        };

        setUserLocation(newLoc);

        // Dynamically place realistic certified DAMIU depots around user's exact coordinates!
        const nearbyDepots = generateDepotsNearCoordinates(latitude, longitude, districtName, cityName);
        setDepots(nearbyDepots);
        setSelectedDepot(null);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          alert('Izin akses lokasi ditolak. Harap izinkan akses lokasi (GPS) pada ikon gembok/setelan di sebelah URL browser Anda agar Minum.in dapat mendeteksi posisi Anda.');
        } else {
          alert('Gagal mendeteksi koordinat GPS. Pastikan sensor GPS / layanan lokasi perangkat Anda aktif.');
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const handleOrderSubmitted = (newOrder: PickupOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'BATAL' } : o))
    );
  };

  const handleReviewSubmitted = (depotId: string, review: ReviewItem) => {
    setDepots((prev) =>
      prev.map((d) => {
        if (d.id === depotId) {
          const updatedReviews = [review, ...d.reviews];
          const newAvgRating =
            Math.round(
              (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length) * 10
            ) / 10;
          return {
            ...d,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: updatedReviews.length,
          };
        }
        return d;
      })
    );
  };

  const handleComplaintSubmitted = (report: ComplaintReport) => {
    setComplaints((prev) => [report, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 font-sans">
      {/* Clean Minimal Navbar (Top Banner removed to reduce clutter) */}
      <Navbar
        userLocation={userLocation}
        onSelectLocation={handleSelectLocation}
        onDetectGPS={handleDetectGPS}
        isLocating={isLocating}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeOrders={orders}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenComplaintModal={() => {
          setComplaintTargetDepot(null);
          setIsComplaintModalOpen(true);
        }}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Main Container: Wide Flexible Laptop Layout */}
      <main className="flex-1 w-full px-4 lg:px-8 py-5 max-w-[1920px] mx-auto flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          {/* LEFT AREA: Filter & Depot Cards */}
          {(viewMode === 'split' || viewMode === 'list') && (
            <section
              className={`flex flex-col space-y-4 ${
                viewMode === 'split'
                  ? 'w-full lg:w-[48%] xl:w-[45%] shrink-0'
                  : 'w-full'
              }`}
            >
              {/* Minimal Filter Bar */}
              <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                totalCount={filteredDepots.length}
              />

              {/* Depot Cards List */}
              <div
                className={`space-y-3 overflow-y-auto pr-1 ${
                  viewMode === 'list'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 space-y-0'
                    : 'max-h-[calc(100vh-170px)]'
                }`}
              >
                {filteredDepots.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 col-span-full">
                    <h3 className="font-semibold text-sm text-slate-800">
                      Tidak ada depot yang sesuai
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Coba sesuaikan filter pencarian Anda.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          onlyCertified: false,
                          waterType: 'all',
                          minRating: 0,
                          sortBy: 'distance',
                          maxDistanceKm: 15,
                        });
                      }}
                      className="mt-3 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  filteredDepots.map((depot) => (
                    <DepotCard
                      key={depot.id}
                      depot={depot}
                      userLocation={userLocation}
                      isSelected={selectedDepot?.id === depot.id}
                      onSelect={() => setSelectedDepot(depot)}
                      onOrderClick={() => setOrderModalDepot(depot)}
                      onViewDetail={() => setDetailModalDepot(depot)}
                    />
                  ))
                )}
              </div>
            </section>
          )}

          {/* RIGHT AREA: Interactive Map Canvas */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <section
              className={`relative ${
                viewMode === 'split'
                  ? 'hidden lg:block lg:flex-1 h-[calc(100vh-130px)] sticky top-20'
                  : 'w-full h-[calc(100vh-130px)]'
              }`}
            >
              <DepotMap
                depots={filteredDepots}
                userLocation={userLocation}
                selectedDepot={selectedDepot}
                onSelectDepot={(depot) => setSelectedDepot(depot)}
                onOrderDepot={(depot) => setOrderModalDepot(depot)}
                onViewDetail={(depot) => setDetailModalDepot(depot)}
                onDetectGPS={handleDetectGPS}
                isLocating={isLocating}
              />
            </section>
          )}
        </div>
      </main>

      {/* MODALS */}
      <DepotDetailModal
        depot={detailModalDepot}
        userLocation={userLocation}
        onClose={() => setDetailModalDepot(null)}
        onOrderClick={(d) => {
          setDetailModalDepot(null);
          setOrderModalDepot(d);
        }}
        onWriteReviewClick={(d) => setReviewModalDepot(d)}
        onReportProblemClick={(d) => {
          setComplaintTargetDepot(d);
          setIsComplaintModalOpen(true);
        }}
      />

      <PickupOrderModal
        depot={orderModalDepot}
        userLocation={userLocation}
        onClose={() => setOrderModalDepot(null)}
        onSubmitOrder={handleOrderSubmitted}
      />

      {isOrderTrackerOpen && (
        <ActiveOrderTracker
          orders={orders}
          userLocation={userLocation}
          onClose={() => setIsOrderTrackerOpen(false)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onCancelOrder={handleCancelOrder}
        />
      )}

      <ReviewModal
        depot={reviewModalDepot}
        onClose={() => setReviewModalDepot(null)}
        onSubmitReview={handleReviewSubmitted}
      />

      {isComplaintModalOpen && (
        <ComplaintReportModal
          depot={complaintTargetDepot}
          allDepots={depotsWithDistance}
          onClose={() => setIsComplaintModalOpen(false)}
          onSubmitReport={handleComplaintSubmitted}
        />
      )}
    </div>
  );
};

export default App;
