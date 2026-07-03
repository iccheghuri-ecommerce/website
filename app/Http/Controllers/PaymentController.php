<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    //
    function index(Request $request, $booking_code)
    {
        $booking = Booking::with('tour')
            ->where('booking_code', $booking_code)
            ->where('user_id', Auth::id())

            ->firstOrFail();


        return Inertia::render('Payment/Index', [
            'booking' => $booking,
            'payment' => $request->payment
        ]);
    }
    function store(Request $request, $booking_code)
    {
        $booking = Booking::with('tour')
            ->where('booking_code', $booking_code)
            ->where('user_id', Auth::id())

            ->firstOrFail();

        $totalAmount = $booking->total_amount;
        $paidAmount = $booking->paid_amount;
        $due = $totalAmount - $paidAmount;
        $minAllowed = min($booking->tour->minimum_booking_amount, $due);

        $validated = $request->validate([
            'amount' => [
                'required',
                'integer',
                "min:{$minAllowed}",
                "max:{$due}",
            ],
            'method' => 'required|string',
            'transaction_id' => 'required|string|unique:payments,transaction_id',
            'note' => 'nullable|string|max:1000',
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'transaction_id' => $validated['transaction_id'],
            'note' => $validated['note'] ?? null,
        ]);

        return Inertia::render('Payment/Success');
    }
}
