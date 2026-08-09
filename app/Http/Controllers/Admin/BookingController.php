<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['tour', 'user']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('booking_code', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
                            ->orWhere('number', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('tour', function ($tq) use ($search) {
                        $tq->where('title', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $bookings = $query->latest()->paginate(15)->withQueryString();

        $stats = [
            'total_bookings' => Booking::count(),
            'active_bookings' => Booking::where('status', 'active')->count(),
            'total_revenue' => Booking::where('status', 'completed')->orWhere('status', 'active')->sum('paid_amount'),
            'total_seats_claimed' => Booking::where('status', 'active')->get()->sum(function ($b) {
                return count($b->seats ?? []);
            }),
        ];

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'status' => 'required|in:active,cancelled,completed',
            'paid_amount' => 'required|integer|min:0',
            'admin_note' => 'nullable|string|max:1000',
        ]);

        $booking->update($data);

        return redirect()->route('admin.bookings.index')->with('success', 'Booking updated successfully.');
    }
}
