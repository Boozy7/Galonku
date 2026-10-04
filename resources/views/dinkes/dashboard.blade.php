@extends('layouts.app', ['title' => 'Portal Dinkes Surabaya - Galonku'])

@section('content')
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
            <div class="flex items-center gap-2 mb-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Logo_Dinas_Kesehatan.svg/1024px-Logo_Dinas_Kesehatan.svg.png" alt="Dinkes" class="h-8">
                <h1 class="text-2xl font-black text-slate-900 tracking-tight">Portal Dinas Kesehatan</h1>
            </div>
            <p class="text-sm text-slate-500">Sistem Pengawasan Sanitasi Depot Air Minum Kota Surabaya</p>
        </div>
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="px-4 py-2 mt-4 sm:mt-0 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-bold transition">Keluar (Log Out)</button>
        </form>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-sm font-medium border border-emerald-200">
            {{ session('success') }}
        </div>
    @endif
    @if($errors->any())
        <div class="mb-6 bg-rose-50 text-rose-800 p-4 rounded-2xl text-sm font-medium border border-rose-200">
            {{ $errors->first() }}
        </div>
    @endif

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Verifikasi Sertifikasi SLHS -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Verifikasi Sertifikasi Depot</h3>
            
            @if($pendingDepots->isEmpty())
                <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p class="text-sm text-slate-500">Semua depot telah tervalidasi.</p>
                </div>
            @else
                <div class="space-y-4">
                    @foreach($pendingDepots as $depot)
                        <div class="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 class="font-bold text-slate-900">{{ $depot->name }}</h4>
                                <p class="text-[11px] text-slate-500 mt-0.5">Alamat: {{ $depot->address }}</p>
                                <p class="text-[11px] font-bold text-amber-700 mt-1">Status: Menunggu ACC Sertifikat Baru</p>
                            </div>
                            <form action="{{ route('dinkes.approve_depot', $depot->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition whitespace-nowrap">
                                    Setujui & ACC
                                </button>
                            </form>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Kelola Aduan Warga -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Laporan & Aduan Warga</h3>

            <div class="space-y-6">
                @foreach($complaints as $c)
                    <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 relative">
                        <!-- Status Badge -->
                        <div class="absolute top-4 right-4">
                            <span class="text-[10px] font-bold px-2 py-1 rounded uppercase
                                {{ $c->status == 'SELESAI' ? 'bg-emerald-100 text-emerald-800' : 
                                  ($c->status == 'TERKIRIM_KE_DINKES' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800') }}">
                                {{ str_replace('_', ' ', $c->status) }}
                            </span>
                        </div>

                        <span class="text-xs font-mono font-bold text-brand-600">{{ $c->ticket_number }}</span>
                        <h4 class="font-bold text-slate-900 mt-1">{{ $c->issue_title }}</h4>
                        <p class="text-xs text-slate-600 mt-1 mb-2">"{{ $c->description }}"</p>
                        <p class="text-[11px] text-slate-500 border-b border-slate-200 pb-3">Pelapor: {{ $c->reporter_name }} | Terlapor: {{ $c->depot->name ?? 'Unknown Depot' }}</p>

                        <!-- Form Update Status -->
                        @if($c->status != 'SELESAI')
                            <form action="{{ route('dinkes.update_complaint', $c->id) }}" method="POST" enctype="multipart/form-data" class="mt-4 space-y-3">
                                @csrf
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Update Status Penanganan</label>
                                    <select name="status" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg">
                                        <option value="SEDANG_INVESTIGASI" {{ $c->status == 'SEDANG_INVESTIGASI' ? 'selected' : '' }}>Sedang Diinvestigasi</option>
                                        <option value="INSPEKSI_LAPANGAN" {{ $c->status == 'INSPEKSI_LAPANGAN' ? 'selected' : '' }}>Inspeksi Lapangan</option>
                                        <option value="SELESAI">Selesai (Kasus Ditutup)</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Catatan Tindak Lanjut</label>
                                    <textarea name="dinkes_notes" rows="2" required class="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg" placeholder="Hasil investigasi dinkes...">{{ $c->dinkes_notes }}</textarea>
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Unggah Foto Bukti Selesai (Opsional)</label>
                                    <input type="file" name="proof_image" class="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-slate-200">
                                </div>

                                <button type="submit" class="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition">Simpan Pembaruan Laporan</button>
                            </form>
                        @else
                            <div class="mt-3 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                <p class="text-[11px] font-bold text-emerald-800">Catatan Dinkes:</p>
                                <p class="text-[11px] text-emerald-700 mt-1">{{ $c->dinkes_notes }}</p>
                                @if($c->proof_image_path)
                                    <div class="mt-2 text-[10px]">
                                        <span class="font-bold text-emerald-800">Bukti Lampiran:</span> Tersedia (Tampil di menu Warga)
                                    </div>
                                @endif
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>

        </div>
    </div>
</div>
@endsection
