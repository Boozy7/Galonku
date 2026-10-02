<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DepotController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Galonku Web Routes
|--------------------------------------------------------------------------
*/

// Homepage & Depot Discovery Map
Route::get('/', [DepotController::class, 'index'])->name('home');
Route::get('/depots', [DepotController::class, 'index'])->name('depots.index');
Route::get('/depots/{slug}', [DepotController::class, 'show'])->name('depots.show');
Route::get('/api/depots', [DepotController::class, 'apiDepots'])->name('api.depots');

// Depot Reviews
Route::post('/depots/{id}/reviews', [ReviewController::class, 'store'])->name('reviews.store');

// Self-Pickup Orders & Real-time Queue Tracking
Route::get('/antrean', [OrderController::class, 'index'])->name('orders.index');
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/order/{depotId}', [OrderController::class, 'create'])->name('orders.create');
Route::post('/order', [OrderController::class, 'store'])->name('orders.store');
Route::get('/order/track/{orderNumber}', [OrderController::class, 'track'])->name('orders.track');
Route::post('/order/track/{orderNumber}/advance', [OrderController::class, 'advanceStatus'])->name('orders.advance');

// Public Complaints / Laporan Kualitas Air ke Dinkes
Route::get('/lapor', [ComplaintController::class, 'create'])->name('complaints.create');
Route::post('/lapor', [ComplaintController::class, 'store'])->name('complaints.store');
Route::get('/lapor/sukses/{ticket}', [ComplaintController::class, 'success'])->name('complaints.success');
