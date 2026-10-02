import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Camera, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Depot, ComplaintIssueType, ComplaintReport } from '../types';

interface ComplaintReportModalProps {
  depot: Depot | null;
  allDepots: Depot[];
  onClose: () => void;
  onSubmitReport: (report: ComplaintReport) => void;
}

export const ComplaintReportModal: React.FC<ComplaintReportModalProps> = ({
  depot,
  allDepots,
  onClose,
  onSubmitReport,
}) => {
  const [selectedDepotId, setSelectedDepotId] = useState<string>(
    depot?.id || allDepots[0]?.id || ''
  );
  const [issueType, setIssueType] = useState<ComplaintIssueType>('air_keruh');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('Leroy');
  const [reporterPhone, setReporterPhone] = useState('081234567890');
  const [purchaseDate, setPurchaseDate] = useState('2026-09-21');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Submitted ticket state
  const [submittedReport, setSubmittedReport] = useState<ComplaintReport | null>(null);

  const issueOptions: { id: ComplaintIssueType; label: string; desc: string }[] = [
    {
      id: 'air_keruh',
      label: 'Air Keruh / Berwarna',
      desc: 'Air tampak berkabut, kekuningan, atau tidak bening transparan',
    },
    {
      id: 'air_berbau',
      label: 'Air Berbau (Kaporit/Belerang/Apek)',
      desc: 'Terdapat bau menyengat yang mengindikasikan kontaminasi kimia atau kotoran',
    },
    {
      id: 'ada_endapan',
      label: 'Ada Endapan / Jentik / Partikel',
      desc: 'Ditemukan partikel melayang, serpihan, atau kotoran di dasar galon',
    },
    {
      id: 'rasa_tidak_wajar',
      label: 'Rasa Tidak Wajar (Pahit/Asam)',
      desc: 'Rasa air berasa aneh dan berbeda dari standar air minum segar',
    },
    {
      id: 'galon_kotor',
      label: 'Galon / Mesin Pengisi Kotor',
      desc: 'Nozzle berlumut atau galon tidak disterilisasi sebelum pengisian',
    },
    {
      id: 'tutup_bocor',
      label: 'Tutup Galon Tidak Bersegel / Bocor',
      desc: 'Potensi kontaminasi saat perjalanan akibat tutup longgar',
    },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateEvidencePhoto = () => {
    // Simulated realistic photo of cloudy water
    setPhotoPreview('https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !reporterName.trim() || !reporterPhone.trim()) {
      alert('Mohon lengkapi semua bidang yang bertanda wajib.');
      return;
    }

    const currentDepot = allDepots.find((d) => d.id === selectedDepotId) || depot;
    const issueObj = issueOptions.find((o) => o.id === issueType);

    const newReport: ComplaintReport = {
      id: `DINKES-LAPOR-${Date.now().toString().slice(-6)}`,
      depotId: selectedDepotId,
      depotName: currentDepot?.name || 'Depot Air Minum',
      reporterName: reporterName.trim(),
      reporterPhone: reporterPhone.trim(),
      issueType,
      issueTitle: issueObj?.label || 'Air Bermasalah',
      description: description.trim(),
      photoUrl: photoPreview || undefined,
      purchaseDate,
      createdAt: new Date().toISOString(),
      status: 'TERKIRIM_KE_DINKES',
      dinkesNotes:
        'Laporan telah diteruskan ke Seksi Kesehatan Lingkungan & Sanitasi Dinas Kesehatan setempat untuk verifikasi sampel.',
    };

    setSubmittedReport(newReport);
    onSubmitReport(newReport);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                Pengaduan Kualitas Air (Kanal Dinkes)
              </h2>
              <p className="text-xs text-rose-100">
                Lapor depot air keruh/berbau dengan bukti foto untuk inspeksi resmi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-submission ticket receipt */}
        {submittedReport ? (
          <div className="p-6 sm:p-8 text-center overflow-y-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Terkirim ke Dinas Kesehatan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Nomor Tiket Pengaduan:
              </h3>
              <div className="text-lg sm:text-xl font-mono font-black text-rose-700 mt-1">
                {submittedReport.id}
              </div>
              <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                Laporan Anda telah berhasil dicatat ke sistem pengawasan DAMIU. Petugas sanitarian Dinkes wilayah akan melakukan verifikasi dan peninjauan depot.
              </p>
            </div>

            {/* Ticket Card Details */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Depot Terlapor:</span>
                <span className="font-bold text-slate-800">{submittedReport.depotName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Masalah:</span>
                <span className="font-bold text-rose-700">{submittedReport.issueTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Pengambilan:</span>
                <span className="font-medium text-slate-700">{submittedReport.purchaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Tindak Lanjut:</span>
                <span className="font-bold text-amber-700">Verifikasi Dokumen & Sampel</span>
              </div>

              {submittedReport.photoUrl && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block mb-1.5">Foto Bukti Terlampir:</span>
                  <img
                    src={submittedReport.photoUrl}
                    alt="Bukti Pengaduan"
                    className="w-full h-32 object-cover rounded-xl border border-slate-300"
                  />
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow"
            >
              Selesai & Kembali ke Aplikasi
            </button>
          </div>
        ) : (
          /* Report Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Dinkes Assurance Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Pengawasan Sanitasi Air Minum Isi Ulang</span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Laporan Anda ditujukan untuk menjaga keselamatan publik. Identitas pelapor dirahasiakan dari pihak depot dan dilindungi UU Pelindungan Konsumen.
                </p>
              </div>
            </div>

            {/* 1. Pilih Depot yang Bermasalah */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                1. Pilih Depot Air Minum
              </label>
              <select
                value={selectedDepotId}
                onChange={(e) => setSelectedDepotId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 bg-white text-slate-800"
              >
                {allDepots.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.address} ({d.district})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Jenis Masalah Kualitas Air */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                2. Jenis Permasalahan Kualitas Air
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {issueOptions.map((opt) => {
                  const isSelected = issueType === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setIssueType(opt.id)}
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                        <span>{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Lampiran Foto Bukti Air (Simulasi Kamera / File) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                3. Lampiran Foto Bukti (Air Keruh / Galon Kotor / Tutup)
              </label>

              {photoPreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-300 w-full h-44 group bg-slate-900">
                  <img
                    src={photoPreview}
                    alt="Preview Bukti"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full text-xs transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-sm">
                    Foto Bukti Siap Dilampirkan
                  </div>
                </div>
              ) : (
                <div className="p-4 border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-2xl text-center space-y-2 bg-slate-50/50">
                  <div className="flex justify-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 shadow-sm hover:bg-slate-50 transition">
                      <Camera className="w-4 h-4 text-rose-600" />
                      <span>Pilih Foto dari Galeri</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSimulateEvidencePhoto}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition"
                    >
                      <span>Gunakan Contoh Bukti Air Keruh</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Foto air di gelas bening atau kondisi dasar galon akan sangat membantu tim verifikasi.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Detail Deskripsi */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                4. Deskripsi Lengkap Temuan Masalah
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan kondisi air: berbau apa, kapan mulai disadari, keluhan kesehatan jika ada, dll..."
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            {/* 5. Tanggal Pengambilan & Kontak Pelapor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tanggal Beli / Isi Ulang
                </label>
                <input
                  type="date"
                  required
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nama Pelapor
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nomor WhatsApp Pelapor
                </label>
                <input
                  type="tel"
                  required
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-lg shadow-rose-600/25 transition"
              >
                Kirim Laporan Pengaduan ke Dinas Kesehatan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
