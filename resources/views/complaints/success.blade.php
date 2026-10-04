@extends('layouts.app', ['title' => 'Pengaduan Terkirim - Galonku'])

@section('content')
<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

    <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl text-center">
        
        <!-- Success Checkmark -->
        <div class="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
        </div>

        <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">Laporan Resmi Diterima</span>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">Pengaduan Berhasil Dikirim</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Laporan pengaduan higienitas air Anda telah diteruskan ke sistem pengawasan Dinas Kesehatan Kota Surabaya.
        </p>

        <!-- Official Ticket Box -->
        <div class="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                <span class="text-xs font-bold text-slate-400 uppercase">Nomor Tiket Pengaduan</span>
                <span class="text-sm font-black font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                    {{ $complaint->ticket_number }}
                </span>
            </div>

            <div class="mt-3 space-y-2 text-xs">
                <div class="flex justify-between">
                    <span class="text-slate-500">Depot Terlapor:</span>
                    <span class="font-bold text-slate-800 text-right">{{ $complaint->depot->name }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-500">Kecamatan:</span>
                    <span class="font-semibold text-slate-800">{{ $complaint->depot->district }}, Surabaya</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-500">Kategori Masalah:</span>
                    <span class="font-semibold text-slate-800 uppercase">{{ $complaint->issue_type }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-slate-500">Status Tindak Lanjut:</span>
                    @if($complaint->status == 'SELESAI')
                        <span class="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Selesai Ditangani
                        </span>
                    @elseif($complaint->status == 'INSPEKSI_LAPANGAN')
                        <span class="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            Inspeksi Lapangan
                        </span>
                    @elseif($complaint->status == 'SEDANG_INVESTIGASI')
                        <span class="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Sedang Diinvestigasi
                        </span>
                    @else
                        <span class="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Terkirim Ke Dinkes
                        </span>
                    @endif
                </div>
            </div>

            @if($complaint->dinkes_notes)
                <div class="mt-4 pt-4 border-t border-slate-200">
                    <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Catatan Resmi Dinkes:</span>
                    <p class="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200/60 shadow-inner">
                        "{{ $complaint->dinkes_notes }}"
                    </p>
                    
                    @if($complaint->proof_image_path)
                        <div class="mt-3">
                            <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Bukti Tindak Lanjut / Dokumentasi Lapangan:</span>
                            <img src="{{ asset($complaint->proof_image_path) }}" alt="Bukti Tindak Lanjut" class="rounded-xl border border-slate-200 shadow-sm max-h-48 object-cover">
                        </div>
                    @endif
                </div>
            @endif

            @if($complaint->photo_url)
                <div class="mt-4 pt-3 border-t border-slate-200">
                    <span class="block text-slate-400 text-xs mb-2">Lampiran Bukti Foto:</span>
                    <img src="{{ $complaint->photo_url }}" alt="Bukti Foto" class="max-h-48 rounded-xl object-cover border border-slate-200">
                </div>
            @endif
        </div>

        <!-- Action Links -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="{{ route('home') }}" 
               class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition">
                Kembali ke Beranda
            </a>
            <a href="{{ route('depots.index') }}" 
               class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition">
                Cari Depot Bersertifikat Lainnya
            </a>
        </div>

    </div>

</div>
@endsection
