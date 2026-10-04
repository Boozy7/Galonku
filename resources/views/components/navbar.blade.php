<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
    <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            
            <!-- Brand Logo -->
            <div class="flex items-center gap-3">
                <a href="{{ route('home') }}" class="flex items-center gap-2.5 sm:gap-3 group">
                    <!-- Galonku Symbol Icon -->
                    <img src="{{ asset('images/logo-symbol.png') }}" 
                         alt="Galonku Icon" 
                         class="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200">
                    
                    <!-- Galonku Text Logo -->
                    <img src="{{ asset('images/logo-text.png') }}" 
                         alt="Galonku - Temukan DAMIU Tersertifikasi" 
                         class="h-8 sm:h-9 w-auto object-contain">

                    <span class="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        SURABAYA
                    </span>
                </a>
            </div>

            <!-- Navigation Links -->
            <nav class="hidden md:flex items-center gap-1">
                <a href="{{ route('depots.index') }}" 
                   class="px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors {{ request()->routeIs('depots.*') || request()->is('/') ? 'text-brand-700 bg-brand-50/80 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }}">
                   Peta & Depot
                </a>
                
                <a href="{{ route('orders.index') }}" 
                   class="px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 {{ request()->routeIs('orders.*') ? 'text-brand-700 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }}">
                   <span>Antrean Saya</span>
                   @if(!empty($navbarActiveCount) && $navbarActiveCount > 0)
                       <span class="px-2 py-0.5 rounded-full text-[11px] font-black bg-brand-600 text-white animate-pulse">
                           {{ $navbarActiveCount }}
                       </span>
                   @endif
                </a>

                <a href="{{ route('complaints.create') }}" 
                   class="px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors {{ request()->routeIs('complaints.*') ? 'text-rose-700 bg-rose-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }}">
                   <span class="flex items-center gap-1.5">
                       <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                       </svg>
                       Lapor Dinkes
                   </span>
                </a>
            </nav>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5">
                <!-- Check Order Status Modal Trigger / Search -->
                <button type="button" 
                        onclick="document.getElementById('trackOrderModal').classList.remove('hidden')" 
                        class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-brand-50 hover:text-brand-800 rounded-xl transition border border-slate-200/80 shadow-sm">
                    <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Cek Antrean</span>
                    @if(!empty($navbarActiveCount) && $navbarActiveCount > 0)
                        <span class="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
                    @endif
                </button>

                <!-- Dinkes Certified Indicator Badge -->
                <div class="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>SLHS Dinkes Surabaya</span>
                </div>

                @auth
                    @if(auth()->user()->role === 'dinkes')
                        <a href="{{ route('dinkes.dashboard') }}" class="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition hover:bg-slate-800">
                            Portal Dinkes
                        </a>
                    @elseif(auth()->user()->role === 'depot')
                        <a href="{{ route('depot.dashboard') }}" class="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition hover:bg-slate-800">
                            Dasbor Depot
                        </a>
                    @else
                        <form action="{{ route('logout') }}" method="POST" class="inline">
                            @csrf
                            <button type="submit" class="px-3.5 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition">Logout</button>
                        </form>
                    @endif
                @else
                    <div class="relative group">
                        <button class="px-3.5 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition flex items-center gap-1">
                            Masuk Akses
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <!-- Dropdown -->
                        <div class="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                            <div class="p-2 flex flex-col gap-1">
                                <a href="{{ route('login') }}" class="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg">Masuk Warga</a>
                                <a href="{{ route('depot.login') }}" class="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg">Portal Mitra Depot</a>
                                <a href="{{ route('dinkes.login') }}" class="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg">Portal Admin Dinkes</a>
                            </div>
                        </div>
                    </div>
                @endauth
            </div>

        </div>
    </div>
</header>

<!-- Modal Cek Antrean / Lacak Order Cepat -->
<div id="trackOrderModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 text-left relative transform transition-all border border-slate-100 max-h-[90vh] flex flex-col">
        
        <!-- Close Button -->
        <button type="button" 
                onclick="document.getElementById('trackOrderModal').classList.add('hidden')"
                class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <div>
                <h3 class="text-base font-extrabold text-slate-900">Antrean & Pesanan Anda</h3>
                <p class="text-xs text-slate-500">Pilih antrean untuk melihat status atau tiket lengkap</p>
            </div>
        </div>

        <!-- LIST PESANAN / ANTREAN AKTIF -->
        <div class="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
            @if(!empty($navbarOrders) && $navbarOrders->isNotEmpty())
                @foreach($navbarOrders as $order)
                    @php
                        $isReady = $order->status === 'SIAP_DIAMBIL';
                        $isProcessing = $order->status === 'SEDANG_DIISI';
                        $isReceived = $order->status === 'DITERIMA';
                    @endphp
                    <a href="{{ route('orders.track', $order->order_number) }}" 
                       class="block p-4 rounded-2xl border {{ $isReady ? 'border-emerald-300 bg-emerald-50/60 ring-2 ring-emerald-200/50' : 'border-slate-200 bg-slate-50/80 hover:bg-brand-50/50 hover:border-brand-200' }} transition group">
                        
                        <div class="flex items-center justify-between gap-2 mb-2">
                            <span class="px-2.5 py-1 rounded-xl font-mono text-sm font-black {{ $isReady ? 'bg-emerald-600 text-white' : 'bg-brand-600 text-white' }}">
                                {{ $order->queue_number }}
                            </span>

                            <!-- Status Chip -->
                            @if($isReady)
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                    Siap Diambil
                                </span>
                            @elseif($isProcessing)
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                    <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                    Sedang Diisi
                                </span>
                            @elseif($isReceived)
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800">
                                    Diterima
                                </span>
                            @else
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 text-slate-700">
                                    Selesai
                                </span>
                            @endif
                        </div>

                        <div class="flex items-center justify-between text-xs">
                            <div>
                                <h4 class="font-bold text-slate-900 group-hover:text-brand-700 transition">{{ $order->depot->name ?? 'Depot Galonku' }}</h4>
                                <p class="text-slate-500 text-[11px]">{{ $order->quantity }}x {{ $order->water_product_name }}</p>
                            </div>

                            <div class="text-right">
                                <span class="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">PIN: {{ $order->pickup_pin }}</span>
                                <div class="text-brand-600 font-bold text-[11px] mt-1 flex items-center justify-end gap-1">
                                    <span>Buka Tiket</span>
                                    <span>&rarr;</span>
                                </div>
                            </div>
                        </div>
                    </a>
                @endforeach

                <div class="pt-2 text-center">
                    <a href="{{ route('orders.index') }}" class="text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline">
                        Lihat Halaman Semua Antrean Saya &rarr;
                    </a>
                </div>
            @else
                <div class="text-center py-6 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p class="text-xs text-slate-500">Belum ada antrean aktif tersimpan.</p>
                    <a href="{{ route('depots.index') }}" class="mt-2 inline-block text-xs font-bold text-brand-600 hover:underline">
                        Cari depot terdekat & pesan galon &rarr;
                    </a>
                </div>
            @endif
        </div>

        <!-- SEARCH FORM (FLEXIBLE) -->
        <div class="mt-4 pt-4 border-t border-slate-100">
            <label for="searchOrderNum" class="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Cari Nomor Antrean Lain (#A-04 atau No. Pesanan):
            </label>
            <form action="{{ route('orders.index') }}" method="GET" class="flex gap-2">
                <input type="text" 
                       id="searchOrderNum" 
                       name="search"
                       required 
                       placeholder="Contoh: #A-04 atau GLK-..." 
                       class="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs font-mono uppercase">
                <button type="submit" 
                        class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/20 transition flex-shrink-0">
                    Cari Tiket
                </button>
            </form>
        </div>

    </div>
</div>
