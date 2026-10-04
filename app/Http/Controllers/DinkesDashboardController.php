<?php

namespace App\Http\Controllers;

use App\Models\Depot;
use App\Models\Complaint;
use Illuminate\Http\Request;

class DinkesDashboardController extends Controller
{
    public function index()
    {
        $pendingDepots = Depot::where('certification_status', 'PROSES_RENEWAL')->orWhere('certification_status', 'BELUM_TERSERTIFIKASI')->get();
        $complaints = Complaint::orderBy('created_at', 'desc')->get();

        return view('dinkes.dashboard', compact('pendingDepots', 'complaints'));
    }

    public function approveDepot($id)
    {
        $depot = Depot::findOrFail($id);
        $depot->certification_status = 'AKTIF';
        $depot->is_certified = true;
        // Extend expiry date artificially by 3 years for demo
        $depot->expiry_date = now()->addYears(3)->format('d F Y');
        $depot->save();

        return back()->with('success', 'Sertifikat Depot ' . $depot->name . ' telah disetujui.');
    }

    public function updateComplaint(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);

        $request->validate([
            'status' => 'required|in:SEDANG_INVESTIGASI,INSPEKSI_LAPANGAN,SELESAI',
            'dinkes_notes' => 'required|string|max:1000',
            'proof_image' => 'nullable|image|max:5120'
        ]);

        $complaint->status = $request->status;
        $complaint->dinkes_notes = $request->dinkes_notes;

        if ($request->hasFile('proof_image')) {
            $path = $request->file('proof_image')->store('complaints_proofs', 'public');
            $complaint->proof_image_path = '/storage/' . $path;
        }

        $complaint->save();

        return back()->with('success', 'Status Laporan ' . $complaint->ticket_number . ' diperbarui.');
    }
}
