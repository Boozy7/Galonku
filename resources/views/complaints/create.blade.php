@extends('layouts.app', ['title' => 'Lapor Masalah Kualitas Air ke Dinkes Surabaya - Galonku'])

@section('content')
<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

    <!-- Header -->
    <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-rose-50 text-rose-600 mb-3 shadow-sm border border-rose-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Kanal Pengaduan Kualitas Air</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Laporkan air keruh, bau, atau kondisi depot tidak higienis langsung ke pengawas sanitasi DAMIU Kota Surabaya.
        </p>
    </div>

    <!-- Errors if any -->
    @if($errors->any())
        <div class="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl">
            <p class="text-xs font-bold uppercase tracking-wider mb-1">Periksa kembali isian formulir:</p>
            <ul class="list-disc pl-5 text-xs space-y-0.5">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg">
        
        <form action="{{ route('complaints.store') }}" method="POST" enctype="multipart/form-data" class="space-y-5">
            @csrf

            <!-- 1. PILIH DEPOT -->
            <div>
                <label for="depot_id" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    1. Pilih Depot Air Minum (DAMIU) Terlapor *
                </label>
                <select name="depot_id" id="depot_id" required 
                        class="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-medium">
                    <option value="">-- Pilih Depot di Surabaya --</option>
                    @foreach($depots as $d)
                        <option value="{{ $d->id }}" {{ (old('depot_id', $selectedDepotId) == $d->id) ? 'selected' : '' }}>
                            {{ $d->name }} ({{ $d->district }} - {{ $d->address }})
                        </option>
                    @endforeach
                </select>
            </div>

            <!-- 2. JENIS KELUHAN -->
            <div>
                <label for="issue_type" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    2. Jenis Permasalahan Kualitas Air *
                </label>
                <select name="issue_type" id="issue_type" required 
                        class="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-medium">
                    <option value="keruh" {{ old('issue_type') === 'keruh' ? 'selected' : '' }}>Air Keruh / Mengandung Partikel Melayang</option>
                    <option value="berbau" {{ old('issue_type') === 'berbau' ? 'selected' : '' }}>Air Berbau (Anyir / Tanah / Klorin Menyengat)</option>
                    <option value="berasa" {{ old('issue_type') === 'berasa' ? 'selected' : '' }}>Rasa Aneh / Pahit / Asam</option>
                    <option value="lumut" {{ old('issue_type') === 'lumut' ? 'selected' : '' }}>Ditemukan Lumut / Jentik / Endapan</option>
                    <option value="serangga" {{ old('issue_type') === 'serangga' ? 'selected' : '' }}>Ditemukan Hewan / Kotoran di Galon</option>
                    <option value="lainnya" {{ old('issue_type') === 'lainnya' ? 'selected' : '' }}>Lainnya / Higienitas Alat Buruk</option>
                </select>
            </div>

            <!-- 3. DESKRIPSI KELUHAN -->
            <div>
                <label for="description" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    3. Kronologi & Deskripsi Detail *
                </label>
                <textarea name="description" id="description" rows="4" required 
                          placeholder="Jelaskan secara rinci permasalahan air (misal: air berbau got saat dibuka, warna agak kekuningan, dibeli tanggal ...)"
                          class="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm">{{ old('description') }}</textarea>
            </div>

            <!-- 4. UNGGAH FOTO BUKTI -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    4. Unggah Foto Bukti Air / Galon (Opsional)
                </label>
                <div class="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-rose-400 transition bg-slate-50">
                    <input type="file" name="photo" id="photoInput" accept="image/*" class="hidden" onchange="previewImage(this)">
                    <label for="photoInput" class="cursor-pointer block">
                        <div id="previewContainer" class="hidden mb-3">
                            <img id="previewImg" src="#" alt="Preview" class="max-h-48 mx-auto rounded-xl shadow-sm object-cover">
                        </div>
                        <div id="uploadPrompt" class="space-y-1">
                            <svg class="w-8 h-8 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span class="text-xs font-bold text-rose-600 block">Klik untuk memilih foto dari galeri / kamera</span>
                            <span class="text-[11px] text-slate-400 block">Format: JPG, PNG, WEBP (Maksimal 5MB)</span>
                        </div>
                    </label>
                </div>
            </div>

            <!-- 5. IDENTITAS PELAPOR -->
            <div class="pt-4 border-t border-slate-100">
                <span class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    5. Identitas Pelapor (Kerahasiaan Terjamin)
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap *</label>
                        <input type="text" name="reporter_name" required value="{{ old('reporter_name') }}" placeholder="Contoh: Rian Pratama"
                               class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">Nomor WhatsApp Aktif *</label>
                        <input type="text" name="reporter_phone" required value="{{ old('reporter_phone') }}" placeholder="Contoh: 081234567890"
                               class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm">
                    </div>
                </div>

                <div class="mt-3">
                    <label class="block text-xs font-medium text-slate-600 mb-1">Alamat Email (Opsional)</label>
                    <input type="email" name="reporter_email" value="{{ old('reporter_email') }}" placeholder="contoh@gmail.com"
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm">
                </div>
            </div>

            <!-- SUBMIT -->
            <button type="submit" 
                    class="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-rose-500/25 transition">
                Kirim Laporan Pengaduan ke Dinkes
            </button>
        </form>

    </div>

</div>
@endsection

@push('scripts')
<script>
    function previewImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('previewImg').src = e.target.result;
                document.getElementById('previewContainer').classList.remove('hidden');
                document.getElementById('uploadPrompt').classList.add('hidden');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>
@endpush
