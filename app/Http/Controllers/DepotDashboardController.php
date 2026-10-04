<?php

namespace App\Http\Controllers;

use App\Models\Depot;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DepotDashboardController extends Controller
{
    public function index()
    {
        $depot = Depot::where('user_id', Auth::id())->first();

        if (!$depot) {
            return "Anda belum mendaftarkan depot. Silakan hubungi admin.";
        }

        $activeOrders = Order::where('depot_id', $depot->id)
            ->whereIn('status', ['DITERIMA', 'SEDANG_DIISI', 'SIAP_DIAMBIL'])
            ->orderBy('created_at', 'asc')
            ->get();

        $completedOrdersCount = Order::where('depot_id', $depot->id)
            ->where('status', 'SELESAI')
            ->whereDate('created_at', today())
            ->count();

        return view('depot.dashboard', compact('depot', 'activeOrders', 'completedOrdersCount'));
    }

    public function toggleStatus()
    {
        $depot = Depot::where('user_id', Auth::id())->firstOrFail();
        $depot->is_open = !$depot->is_open;
        $depot->save();

        return back()->with('success', 'Status depot berhasil diubah menjadi ' . ($depot->is_open ? 'Buka' : 'Tutup') . '.');
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:SEDANG_DIISI,SIAP_DIAMBIL'
        ]);

        $order->status = $request->status;
        $order->save();

        return back()->with('success', 'Status pesanan ' . $order->queue_number . ' diperbarui.');
    }

    public function finishOrder(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        
        $request->validate([
            'pin' => 'required|string|size:4'
        ]);

        if ($request->pin !== $order->pickup_pin) {
            return back()->withErrors(['pin' => 'PIN Keamanan salah! Galon tidak dapat diserahkan.'])->withInput();
        }

        $order->status = 'SELESAI';
        $order->save();

        return back()->with('success', 'Transaksi Selesai! Galon berhasil diserahkan untuk pesanan ' . $order->queue_number . '.');
    }

    public function uploadCert(Request $request)
    {
        $depot = Depot::where('user_id', Auth::id())->firstOrFail();

        $request->validate([
            'certificate' => 'required|image|max:5120' // max 5MB
        ]);

        $path = $request->file('certificate')->store('certificates', 'public');
        
        $depot->certification_status = 'PROSES_RENEWAL';
        $depot->save();

        return back()->with('success', 'Sertifikat baru berhasil diunggah. Menunggu verifikasi Dinas Kesehatan.');
    }
}
