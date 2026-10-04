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

// Authentication Routes
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepotDashboardController;
use App\Http\Controllers\DinkesDashboardController;

Route::get('/login', [AuthController::class, 'showUserLogin'])->name('login');
Route::get('/register', [AuthController::class, 'showUserRegister'])->name('register');
Route::post('/register', [AuthController::class, 'registerUser'])->name('register.submit');

Route::get('/depot/login', [AuthController::class, 'showDepotLogin'])->name('depot.login');
Route::get('/depot/register', [AuthController::class, 'showDepotRegister'])->name('depot.register');
Route::post('/depot/register', [AuthController::class, 'registerDepot'])->name('depot.register.submit');

Route::get('/dinkes/login', [AuthController::class, 'showDinkesLogin'])->name('dinkes.login');
Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Depot Admin Dashboard
Route::middleware(['auth', 'role:depot'])->prefix('depot')->name('depot.')->group(function () {
    Route::get('/', [DepotDashboardController::class, 'index'])->name('dashboard');
    Route::post('/toggle-status', [DepotDashboardController::class, 'toggleStatus'])->name('toggle_status');
    Route::post('/order/{id}/status', [DepotDashboardController::class, 'updateOrderStatus'])->name('update_order_status');
    Route::post('/order/{id}/finish', [DepotDashboardController::class, 'finishOrder'])->name('finish_order');
    Route::post('/cert/upload', [DepotDashboardController::class, 'uploadCert'])->name('upload_cert');
});

// Dinkes Admin Dashboard
Route::middleware(['auth', 'role:dinkes'])->prefix('dinkes')->name('dinkes.')->group(function () {
    Route::get('/', [DinkesDashboardController::class, 'index'])->name('dashboard');
    Route::post('/depot/{id}/approve', [DinkesDashboardController::class, 'approveDepot'])->name('approve_depot');
    Route::post('/complaint/{id}/update', [DinkesDashboardController::class, 'updateComplaint'])->name('update_complaint');
});

// Gemini AI Assistant API (Server-side secured, never leaks key to frontend)
use App\Services\GeminiService;
Route::post('/api/ai/ask', function (\Illuminate\Http\Request $request, GeminiService $gemini) {
    $request->validate([
        'prompt' => 'required|string|max:1000',
    ]);
    try {
        $reply = $gemini->generateText($request->input('prompt'));
        return response()->json(['reply' => $reply]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
})->name('api.ai.ask');

// Deployment Database Migration Helper (Protected by secret token)
Route::get('/deploy-migrate', function (\Illuminate\Http\Request $request) {
    if ($request->query('secret') !== 'galonku2026') {
        abort(403, 'Unauthorized access to migration endpoint.');
    }
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $migrateOut = \Illuminate\Support\Facades\Artisan::output();

        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        $seedOut = \Illuminate\Support\Facades\Artisan::output();

        return response("<h2>Database Migrated & Seeded Successfully!</h2><pre>{$migrateOut}\n{$seedOut}</pre>");
    } catch (\Throwable $e) {
        return response("<h2>Migration Failed:</h2><pre>{$e->getMessage()}</pre>", 500);
    }
});


