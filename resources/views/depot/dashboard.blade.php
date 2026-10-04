@extends('layouts.app', ['title' => 'Dasbor Mitra Depot - Galonku'])

@section('content')
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">Manajemen Depot Air</h1>
            <p class="text-sm text-slate-500 mt-1">Halo, {{ auth()->user()->name }} ({{ $depot->name ?? 'Belum ada depot' }})</p>
        </div>
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="px-4 py-2 mt-4 sm:mt-0 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-bold transition">Keluar</button>
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Kolom Kiri: Operasional & Sertifikat -->
        <div class="space-y-6">
            
            <!-- Status Buka Tutup -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Status Operasional</h3>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-4 h-4 rounded-full {{ $depot->is_open ? 'bg-emerald-500' : 'bg-rose-500' }}"></div>
                        <span class="font-bold text-slate-900">{{ $depot->is_open ? 'Toko Buka' : 'Toko Tutup' }}</span>
                    </div>
                    <form action="{{ route('depot.toggle_status') }}" method="POST">
                        @csrf
                        <button type="submit" class="px-4 py-2 text-xs font-bold rounded-xl text-white {{ $depot->is_open ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700' }}">
                            {{ $depot->is_open ? 'Tutup Toko' : 'Buka Toko' }}
                        </button>
                    </form>
                </div>
            </div>

            <!-- Status Sertifikasi -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Sertifikat SLHS Dinkes</h3>
                
                @if($depot->certification_status === 'AKTIF')
                    <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                        <p class="text-xs font-bold text-emerald-800">Sertifikat Aktif</p>
                        <p class="text-[11px] text-emerald-600">Berlaku sampai: {{ $depot->expiry_date }}</p>
                    </div>
                @elseif($depot->certification_status === 'PROSES_RENEWAL')
                    <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                        <p class="text-xs font-bold text-amber-800">Dalam Masa Perpanjangan</p>
                        <p class="text-[11px] text-amber-600">Menunggu verifikasi Dinkes</p>
                    </div>
                @else
                    <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl mb-4">
                        <p class="text-xs font-bold text-rose-800">Belum Tersertifikasi</p>
                    </div>
                @endif

                <form action="{{ route('depot.upload_cert') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <label class="block text-[11px] font-bold text-slate-600 mb-1.5">Perbarui / Unggah Dokumen Baru</label>
                    <input type="file" name="certificate" required class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100">
                    <button type="submit" class="w-full mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800">Unggah ke Dinkes</button>
                </form>
            </div>

        </div>

        <!-- Kolom Kanan: Antrean Pesanan -->
        <div class="lg:col-span-2">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-full">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500">Antrean Refill Hari Ini</h3>
                    <span class="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{{ $activeOrders->count() }} Aktif | {{ $completedOrdersCount }} Selesai</span>
                </div>

                @if($activeOrders->isEmpty())
                    <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p class="text-sm text-slate-500">Belum ada pesanan aktif saat ini.</p>
                    </div>
                @else
                    <div class="space-y-4">
                        @foreach($activeOrders as $order)
                            <div class="p-5 rounded-2xl border {{ $order->status == 'SIAP_DIAMBIL' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200' }}">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    
                                    <div>
                                        <div class="flex items-center gap-2 mb-1">
                                            <span class="px-2.5 py-1 bg-brand-600 text-white font-mono font-black rounded-lg text-sm">{{ $order->queue_number }}</span>
                                            <span class="text-[11px] font-bold px-2 py-0.5 rounded border 
                                                {{ $order->status == 'DITERIMA' ? 'bg-slate-200 text-slate-700' : ($order->status == 'SEDANG_DIISI' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300') }}">
                                                {{ $order->status }}
                                            </span>
                                        </div>
                                        <p class="text-sm font-bold text-slate-900">{{ $order->customer_name }} <span class="text-slate-400 font-normal">({{ $order->customer_phone }})</span></p>
                                        <p class="text-xs text-slate-500 mt-0.5">{{ $order->quantity }}x {{ $order->water_product_name }}</p>
                                    </div>

                                    <!-- Action Buttons depending on status -->
                                    <div class="flex-shrink-0">
                                        @if($order->status == 'DITERIMA')
                                            <form action="{{ route('depot.update_order_status', $order->id) }}" method="POST">
                                                @csrf
                                                <input type="hidden" name="status" value="SEDANG_DIISI">
                                                <button type="submit" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition">Mulai Isi & Sterilisasi</button>
                                            </form>
                                        @elseif($order->status == 'SEDANG_DIISI')
                                            <form action="{{ route('depot.update_order_status', $order->id) }}" method="POST">
                                                @csrf
                                                <input type="hidden" name="status" value="SIAP_DIAMBIL">
                                                <button type="submit" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm transition">Tandai Siap Diambil</button>
                                            </form>
                                        @elseif($order->status == 'SIAP_DIAMBIL')
                                            <form action="{{ route('depot.finish_order', $order->id) }}" method="POST" class="flex items-center gap-2">
                                                @csrf
                                                <input type="text" name="pin" required maxlength="4" placeholder="PIN User" class="w-20 px-3 py-2 text-sm text-center font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                                <button type="submit" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition">Serahkan Galon (Selesai)</button>
                                            </form>
                                        @endif
                                    </div>

                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif

            </div>
        </div>

    </div>
</div>
@endsection
