import React, { useState } from 'react';
import { X, Star, CheckCircle2, Sparkles, Droplets } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Depot, ReviewItem } from '../types';

interface ReviewModalProps {
  depot: Depot | null;
  onClose: () => void;
  onSubmitReview: (depotId: string, review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  depot,
  onClose,
  onSubmitReview,
}) => {
  if (!depot) return null;

  const [userName, setUserName] = useState('');
  const [overallRating, setOverallRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [tasteRating, setTasteRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Air Sangat Jernih',
    'Rasa Segar Alami',
  ]);

  const availableTags = [
    'Air Sangat Jernih',
    'Rasa Segar Alami',
    'TDS Rendah Terukur',
    'Tutup Disegel Rapi',
    'Galon Bersih Mengkilap',
    'Pelayanan Super Cepat',
    'Tempat Higienis',
    'Harga Terjangkau',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      alert('Silakan isi Nama dan Ulasan Anda.');
      return;
    }

    const newReview: ReviewItem = {
      id: `REV-${Date.now().toString().slice(-5)}`,
      userName: userName.trim(),
      date: 'Hari ini',
      rating: overallRating,
      waterClarityRating: clarityRating,
      tasteRating: tasteRating,
      gallonCleanlinessRating: cleanlinessRating,
      serviceRating: serviceRating,
      comment: comment.trim(),
      tags: selectedTags,
      verifiedPurchase: true,
    };

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    onSubmitReview(depot.id, newReview);
    onClose();
  };

  const renderStarSelector = (
    label: string,
    value: number,
    onChange: (v: number) => void
  ) => (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-700 font-medium">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value
                  ? 'fill-amber-400 text-amber-500'
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-amber-900 ml-1.5 w-4 text-right">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-amber-600 to-brand-600 text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              <Star className="w-5 h-5 fill-white text-white" />
              <span>Beri Ulasan Kualitas Air</span>
            </h2>
            <p className="text-xs text-amber-100 mt-0.5">{depot.name}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Overall Rating Hero */}
          <div className="text-center p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              Rating Keseluruhan Depot
            </div>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className="p-1.5 hover:scale-125 transition"
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      star <= overallRating
                        ? 'fill-amber-400 text-amber-500 drop-shadow'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-amber-800 mt-1">
              {overallRating === 5 && 'Sangat Luar Biasa (Higienis & Segar)'}
              {overallRating === 4 && 'Puas (Air Bersih & Bagus)'}
              {overallRating === 3 && 'Cukup Baik'}
              {overallRating <= 2 && 'Kurang Memuaskan'}
            </div>
          </div>

          {/* Sub-Criteria Ratings */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Evaluasi Detail Aspek Kualitas Air
            </div>
            {renderStarSelector('1. Kejernihan Air (Bebas Keruh/Partikel)', clarityRating, setClarityRating)}
            {renderStarSelector('2. Rasa & Kesegaran Air (Tidak Aneh/Bau)', tasteRating, setTasteRating)}
            {renderStarSelector('3. Kebersihan Galon & Tutup Segel', cleanlinessRating, setCleanlinessRating)}
            {renderStarSelector('4. Keramahan & Kecepatan Layanan Depot', serviceRating, setServiceRating)}
          </div>

          {/* User Info */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Contoh: Rian Pratama"
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Ulasan Pengalaman Anda
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan kejernihan air, kesegaran rasa, atau pelayanan dari depot ini..."
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Tag Highlights */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Pilih Tag Keunggulan
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25 transition"
            >
              Kirim Ulasan Kualitas Air
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
