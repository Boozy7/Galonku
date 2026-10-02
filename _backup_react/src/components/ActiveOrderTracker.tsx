import React from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Play,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PickupOrder, OrderStatus, UserLocation } from '../types';
import { getGoogleMapsRouteUrl, formatRupiah } from '../utils/distance';

interface ActiveOrderTrackerProps {
  orders: PickupOrder[];
  userLocation: UserLocation;
  onClose: () => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onCancelOrder: (orderId: string) => void;
}

export const ActiveOrderTracker: React.FC<ActiveOrderTrackerProps> = ({
  orders,
  userLocation,
  onClose,
  onUpdateOrderStatus,
  onCancelOrder,
}) => {
  const steps: { key: OrderStatus; label: string }[] = [
    { key: 'DITERIMA', label: 'Pesanan Diterima' },
    { key: 'SEDANG_DIISI', label: 'Sedang Diisi' },
    { key: 'SIAP_DIAMBIL', label: 'Siap Diambil' },
    { key: 'SELESAI', label: 'Selesai' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'DITERIMA': return 0;
      case 'SEDANG_DIISI': return 1;
      case 'SIAP_DIAMBIL': return 2;
      case 'SELESAI': return 3;
      default: return -1;
    }
  };

  const handleAdvanceSimulation = (order: PickupOrder) => {
    const currentIndex = getStepIndex(order.status);
    if (currentIndex < 3) {
      const nextKey = steps[currentIndex + 1].key;
      onUpdateOrderStatus(order.id, nextKey);
      if (nextKey === 'SIAP_DIAMBIL') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Clean Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-semibold text-base text-slate-900">
              Antrean & Pelacakan Pickup
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau proses persiapan galon secara real-time
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-medium text-sm text-slate-700">
                Belum ada antrean pickup aktif
              </h4>
              <p className="text-xs text-slate-400">
                Pilih depot air di peta atau daftar dan pesan isi ulang air.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const currentStepIdx = getStepIndex(order.status);
              const isCancelled = order.status === 'BATAL';
              const isReady = order.status === 'SIAP_DIAMBIL';
              const isDone = order.status === 'SELESAI';

              const gmapUrl = getGoogleMapsRouteUrl(
                userLocation.lat,
                userLocation.lng,
                order.depotLat,
                order.depotLng,
                order.depotName
              );

              return (
                <div
                  key={order.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isReady
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : isCancelled
                      ? 'border-slate-200 bg-slate-50/50 opacity-60'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  {/* Top: Depot Name, PIN, Queue */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                          {order.queueNumber}
                        </span>
                        {isReady && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ● Siap Diambil
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-base text-slate-900 mt-1">
                        {order.depotName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.depotAddress}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-medium block">PIN Ambil</span>
                      <span className="font-mono font-black text-lg tracking-wider text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {order.pickupPin}
                      </span>
                    </div>
                  </div>

                  {/* Clean Minimal Stepper */}
                  {!isCancelled && (
                    <div className="py-5">
                      <div className="relative flex items-center justify-between">
                        {/* Connecting Line */}
                        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full z-0">
                          <div
                            className="h-full bg-slate-900 rounded-full transition-all duration-300"
                            style={{
                              width: `${(currentStepIdx / 3) * 100}%`,
                            }}
                          />
                        </div>

                        {/* Steps */}
                        {steps.map((step, idx) => {
                          const isPassed = currentStepIdx > idx;
                          const isCurrent = currentStepIdx === idx;
                          return (
                            <div key={step.key} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                                  isPassed
                                    ? 'bg-slate-900 text-white'
                                    : isCurrent
                                    ? 'bg-slate-900 text-white ring-4 ring-slate-200'
                                    : 'bg-white border border-slate-300 text-slate-400'
                                }`}
                              >
                                {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                              </div>
                              <span
                                className={`mt-1.5 text-[11px] font-medium whitespace-nowrap ${
                                  isCurrent
                                    ? 'text-slate-900 font-semibold'
                                    : isPassed
                                    ? 'text-slate-700'
                                    : 'text-slate-400'
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Order Summary details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600">
                    <span>
                      {order.quantity}x {order.waterProductName} ({order.gallonOptionName})
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatRupiah(order.totalAmount)}
                    </span>
                  </div>

                  {/* Actions: Direct GMap & Simulation */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100">
                    {/* Direct Google Maps Route (User Request) */}
                    <a
                      href={gmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
                      title="Buka Navigasi Rute Langsung di Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5 text-sky-400" />
                      <span>Rute Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <div className="flex items-center gap-1.5 ml-auto">
                      {!isDone && !isCancelled && (
                        <button
                          onClick={() => handleAdvanceSimulation(order)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                          title="Simulasikan langkah status berikutnya"
                        >
                          <Play className="w-3 h-3 text-slate-600" />
                          <span>Simulasi Tahap</span>
                        </button>
                      )}

                      {order.status === 'DITERIMA' && (
                        <button
                          onClick={() => onCancelOrder(order.id)}
                          className="px-2 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition"
                        >
                          Batal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
