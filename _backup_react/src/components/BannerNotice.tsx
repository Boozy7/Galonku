import React, { useState } from 'react';
import { ShieldCheck, Info, X, Sparkles, MapPin, Navigation } from 'lucide-react';

export const BannerNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-cyan-900 text-white px-4 py-2.5 sm:px-8 border-b border-brand-700/50 text-xs shadow-inner">
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1">
          <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <p className="text-slate-200 text-xs">
            <b className="text-white font-bold">Jaminan Air Minum Aman & Higienis:</b> Seluruh depot berlogo{' '}
            <span className="text-emerald-400 font-bold underline decoration-emerald-500/50">
              SLHS Dinkes
            </span>{' '}
            telah memenuhi baku mutu laboratorium bebas bakteri <i>E. coli</i> & logam berat. Pesan ambil mandiri di depot tanpa ongkos kirim.
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
