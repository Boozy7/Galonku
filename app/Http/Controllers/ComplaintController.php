<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Depot;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ComplaintController extends Controller
{
    /**
     * Show complaint form.
     */
    public function create(Request $request)
    {
        $depots = Depot::orderBy('name')->get();
        $selectedDepotId = $request->query('depot_id');

        return view('complaints.create', [
            'depots' => $depots,
            'selectedDepotId' => $selectedDepotId,
        ]);
    }

    /**
     * Store complaint and report to Dinkes Surabaya simulation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'depot_id' => 'required|exists:depots,id',
            'reporter_name' => 'required|string|max:100',
            'reporter_phone' => 'required|string|max:20',
            'reporter_email' => 'nullable|email|max:100',
            'issue_type' => 'required|in:keruh,berbau,berasa,lumut,serangga,lainnya',
            'description' => 'required|string|max:1500',
            'photo' => 'nullable|image|max:5120', // max 5MB
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('complaints', 'public');
        }

        // Ticket format: DINKES-SBY-2026-XXXX
        $ticketNumber = 'DINKES-SBY-' . date('Y') . '-' . strtoupper(Str::random(6));

        $complaint = Complaint::create([
            'ticket_number' => $ticketNumber,
            'depot_id' => $validated['depot_id'],
            'reporter_name' => $validated['reporter_name'],
            'reporter_phone' => $validated['reporter_phone'],
            'reporter_email' => $validated['reporter_email'] ?? null,
            'issue_type' => $validated['issue_type'],
            'description' => $validated['description'],
            'photo_url' => $photoPath ? asset('storage/' . $photoPath) : null,
            'status' => 'PENDING',
        ]);

        return redirect()->route('complaints.success', ['ticket' => $complaint->ticket_number]);
    }

    /**
     * Complaint submission success view with ticket details.
     */
    public function success(string $ticket)
    {
        $complaint = Complaint::with('depot')->where('ticket_number', $ticket)->firstOrFail();

        return view('complaints.success', [
            'complaint' => $complaint,
        ]);
    }
}
