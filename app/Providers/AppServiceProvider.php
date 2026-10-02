<?php

namespace App\Providers;

use App\Models\Order;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('*', function ($view) {
            if (!Schema::hasTable('orders')) {
                return;
            }

            try {
                $sessionOrders = session()->get('my_order_numbers', []);
                if (!empty($sessionOrders)) {
                    $userOrders = Order::with('depot')
                        ->whereIn('order_number', $sessionOrders)
                        ->latest()
                        ->get();
                } else {
                    // Fallback: Show latest orders so user immediately sees their recent orders
                    $userOrders = Order::with('depot')->latest()->take(5)->get();
                }

                $activeOrdersCount = $userOrders->whereIn('status', ['DITERIMA', 'SEDANG_DIISI', 'SIAP_DIAMBIL'])->count();

                $view->with([
                    'navbarOrders' => $userOrders,
                    'navbarActiveCount' => $activeOrdersCount,
                ]);
            } catch (\Throwable $e) {
                // Ignore during migrations or CLI commands without DB
            }
        });
    }
}
