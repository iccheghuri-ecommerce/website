<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    //
    function index(Request $request, $slug)
    {
        $tour = Tour::where('slug', $slug)->firstOrFail();
        $data = $request->validate([
            'adults' => 'required|integer|min:0',
            'couples' => 'required|integer|min:0',
            'children' => 'required|integer|min:0',
            'payment' => 'required|in:full,partial',
        ]);

        return Inertia::render('Booking/Index', [
            'tour' => $tour,
            'user' => Auth::user(),
            'selection' => $data,
        ]);
    }

    function store(Request $request, $slug)
    {
        $tour = Tour::where('slug', $slug)->firstOrFail();

        if (!$tour->is_active) {
            return back()->withErrors([
                'booking' => 'This tour is unavailable.',
            ]);
        }
        $bookedCount = Booking::where('tour_id', $tour->id)
            ->where('status', 'active')
            ->sum(DB::raw('adult_count + child_count + (couple_count * 2)'));

        if ($bookedCount >= $tour->total_seats) {
            return back()->withErrors([
                'booking' => 'The tour is sold out',
            ]);
        }

        $data = $request->validate([
            'adults' => 'required|integer|min:0',
            'couples' => 'required|integer|min:0',
            'children' => 'required|integer|min:0',
            'payment' => 'required|in:full,partial',
            'note' => 'nullable|string|max:1000',
        ]);

        $adultsCount = $data['adults'];
        $couplesCount = $data['couples'];
        $childrenCount = $data['children'];



        if ($adultsCount + $couplesCount + $childrenCount === 0) {
            return back()->withErrors([
                'booking' => 'Select at least one passenger.'
            ]);
        }

        if (($adultsCount > 0 && is_null($tour->adult_price)) ||
            ($couplesCount > 0 && is_null($tour->couple_price)) ||
            ($childrenCount > 0 && is_null($tour->child_price))
        ) {
            return back()->withErrors([
                'booking' => 'The requested ticket tier options are invalid for this tour.'
            ]);
        }

        if (now() > $tour->booking_ends_at) {
            return back()->withErrors([
                'booking' => 'Booking closed. '
            ]);
        }
        $totalAmount =
            $adultsCount * $tour->adult_price +
            $childrenCount * $tour->child_price +
            $couplesCount * $tour->couple_price;



        $booking = Booking::create([
            'tour_id' => $tour->id,
            'user_id' => Auth::id(),
            'booking_code' => strtoupper(Str::random(10)),

            'adult_count' => $adultsCount,
            'child_count' => $childrenCount,
            'couple_count' => $couplesCount,

            'total_amount' => $totalAmount,
            'paid_amount' => 0,

            'status' => 'active',

            'note' => $data['note'],
        ]);

        return redirect("/bookings/{$booking->booking_code}/pay?payment={$data['payment']}");
    }
}
