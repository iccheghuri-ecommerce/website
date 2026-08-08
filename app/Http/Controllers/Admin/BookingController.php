<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['tour', 'user'])->latest()->paginate(15);

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
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
