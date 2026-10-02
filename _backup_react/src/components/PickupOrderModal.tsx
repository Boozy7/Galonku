import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Minus, 
  Plus, 
  CheckCircle2, 
  Navigation, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Depot, UserLocation, PickupOrder } from '../types';
import { getGoogleMapsRouteUrl, formatRupiah, estimateTravelTime } from '../utils/distance';

interface PickupOrderModalProps {
  depot: Depot | null;
  userLocation: UserLocation;
  onClose: () => void;
  onSubmitOrder: (order: PickupOrder) => void;
}

export const PickupOrderModal: React.FC<PickupOrderModalProps> = ({
  depot,
  userLocation,
  onClose,
  onSubmitOrder,
}) => {
  if (!depot) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    depot.products[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(2);
  const [gallonOption, setGallonOption] = useState<'bring_own' | 'new_gallon'>('bring_own');
  const [pickupTimeChoice, setPickupTimeChoice] = useState<string>('15_mins');
  const [customTime, setCustomTime] = useState<string>('17:30');
  const [customerName, setCustomerName] = useState<string>('Leroy');
  const [customerPhone, setCustomerPhone] = useState<string>('081234567890');
  const [notes, setNotes] = useState<string>('');
  
  const [createdOrder, setCreatedOrder] = useState<PickupOrder | null>(null);

  const selectedProduct = depot.products.find((p) => p.id === selectedProductId) || depot.products[0];
  const gallonFeePerUnit = gallonOption === 'new_gallon' ? depot.gallonOptions.newGallon.fee : 0;
  const waterTotal = (selectedProduct?.price || 0) * quantity;
  const gallonTotal = gallonFeePerUnit * quantity;
  const grandTotal = waterTotal + gallonTotal;

  const travel = estimateTravelTime(depot.distanceKm || 1);
  const gmapUrl = getGoogleMapsRouteUrl(
    userLocation.lat,
    userLocation.lng,
    depot.lat,
    depot.lng,
    depot.name
  );

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Silakan isi Nama dan Nomor WhatsApp.');
      return;
    }

    let timeLabel = '15 Menit lagi';
    if (pickupTimeChoice === '30_mins') timeLabel = '30 Menit lagi';
    else if (pickupTimeChoice === '60_mins') timeLabel = '1 Jam lagi';
    else if (pickupTimeChoice === 'custom') timeLabel = `Pukul ${customTime} WIB`;

    const randomQueue = Math.floor(Math.random() * 20) + 1;
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: PickupOrder = {
      id: `MINUM-${Date.now().toString().slice(-6)}`,
      queueNumber: `#A-${randomQueue < 10 ? '0' + randomQueue : randomQueue}`,
      depotId: depot.id,
      depotName: depot.name,
      depotAddress: depot.address,
      depotPhone: depot.phone,
      depotLat: depot.lat,
      depotLng: depot.lng,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      waterType: selectedProduct.type,
      waterProductName: selectedProduct.name,
      unitPrice: selectedProduct.price,
      quantity,
      gallonOption,
      gallonOptionName:
        gallonOption === 'bring_own'
          ? 'Bawa Galon Sendiri (Tukar)'
          : 'Beli Galon Baru (Food Grade)',
      gallonFee: gallonTotal,
      totalAmount: grandTotal,
      pickupTimeEstimated: `${timeLabel} (~${travel.motorMinutes} mnt)`,
      status: 'DITERIMA',
      createdAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
      pickupPin: randomPin,
    };

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setCreatedOrder(newOrder);
    onSubmitOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Sleek Minimal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-semibold text-base text-slate-900">
              Pesan Ambil di Depot (Pickup)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {depot.name} • {depot.distanceKm} km (Bebas Ongkir)
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post-Order Success Screen */}
        {createdOrder ? (
          <div className="p-6 text-center overflow-y-auto space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pesanan Terkirim ke Depot
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Silakan datang ke depot sesuai jam estimasi. Tunjukkan PIN berikut saat pengambilan.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left max-w-sm mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Nomor Antrean:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {createdOrder.queueNumber}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
                <span className="text-slate-500">Kode PIN Pengambilan:</span>
                <span className="font-mono font-black text-slate-900 text-base tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                  {createdOrder.pickupPin}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pesanan:</span>
                <span className="font-medium text-slate-800">
                  {createdOrder.quantity}x {createdOrder.waterProductName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Kedatangan:</span>
                <span className="font-medium text-slate-800">{createdOrder.pickupTimeEstimated}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/80 text-sm font-semibold">
                <span className="text-slate-700">Total Bayar di Tempat:</span>
                <span className="text-slate-900">{formatRupiah(createdOrder.totalAmount)}</span>
              </div>
            </div>

            {/* DIRECT GOOGLE MAPS NAVIGATION */}
            <div className="space-y-2 max-w-sm mx-auto pt-2">
              <a
                href={gmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>Buka Rute di Google Maps Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                Tutup & Pantau Status Real-Time
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleCreateOrder} className="p-5 overflow-y-auto space-y-4">
            {/* 1. Water Type */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-2">
                Pilih Jenis Air
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {depot.products.map((prod) => {
                  const isSelected = prod.id === selectedProductId;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-xs truncate">{prod.name}</div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                          TDS ~{prod.tdsAvg} ppm
                        </div>
                      </div>
                      <span className="text-xs font-semibold ml-2">
                        {formatRupiah(prod.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Jumlah & Opsi Galon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Jumlah Counter */}
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">
                  Jumlah Galon
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs font-medium text-slate-700 ml-2">Galon:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Opsi Galon */}
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">
                  Opsi Galon
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGallonOption('bring_own')}
                    className={`p-2 rounded-xl border text-left text-xs transition ${
                      gallonOption === 'bring_own'
                        ? 'border-slate-900 bg-slate-900 text-white font-medium'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>Bawa Sendiri</div>
                    <div className={`text-[10px] ${gallonOption === 'bring_own' ? 'text-slate-300' : 'text-slate-400'}`}>
                      +Rp 0 (Tukar)
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGallonOption('new_gallon')}
                    className={`p-2 rounded-xl border text-left text-xs transition ${
                      gallonOption === 'new_gallon'
                        ? 'border-slate-900 bg-slate-900 text-white font-medium'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>Beli Galon Baru</div>
                    <div className={`text-[10px] ${gallonOption === 'new_gallon' ? 'text-slate-300' : 'text-slate-400'}`}>
                      +{formatRupiah(depot.gallonOptions.newGallon.fee)}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Estimasi Waktu */}
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">
                Estimasi Kedatangan ke Depot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '15_mins', label: '15 Menit' },
                  { id: '30_mins', label: '30 Menit' },
                  { id: '60_mins', label: '1 Jam' },
                  { id: 'custom', label: 'Jam Khusus' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPickupTimeChoice(t.id)}
                    className={`p-2 rounded-xl border text-center text-xs font-medium transition ${
                      pickupTimeChoice === t.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {pickupTimeChoice === 'custom' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">Jam:</span>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800"
                  />
                  <span className="text-xs text-slate-400">WIB</span>
                </div>
              )}
            </div>

            {/* 4. Pemesan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  Nama Pemesan
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">
                  WhatsApp (Notifikasi Siap)
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            {/* Ringkasan Biaya Minimal */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{quantity}x {selectedProduct.name}</span>
                <span className="font-medium text-slate-900">{formatRupiah(waterTotal)}</span>
              </div>
              {gallonOption === 'new_gallon' && (
                <div className="flex justify-between text-slate-600">
                  <span>{quantity}x Galon Baru</span>
                  <span className="font-medium text-slate-900">{formatRupiah(gallonTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Ongkir (Ambil Sendiri)</span>
                <span className="text-emerald-600 font-medium">Rp 0</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200/80 text-sm font-semibold">
                <span className="text-slate-800">Total:</span>
                <span className="text-slate-900 font-bold">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {/* Actions: Direct GMap & Confirm Button */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={gmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition shrink-0"
                title="Lihat Rute di Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-600" />
                <span>Rute GMap</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
              >
                Konfirmasi Pesanan ({formatRupiah(grandTotal)})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
