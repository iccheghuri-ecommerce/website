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
    public function index(Request $request, $slug)
    {
        $tour = Tour::where('slug', $slug)->firstOrFail();
        $data = $request->validate([
            'adults' => 'required|integer|min:0',
            'couples' => 'required|integer|min:0',
            'payment' => 'required|in:full,partial',
        ]);

        $occupiedSeats = Booking::where('tour_id', $tour->id)
            ->where('status', 'active')
            ->pluck('seats')
            ->filter()
            ->flatten()
            ->toArray();

        return Inertia::render('Booking/Index', [
            'tour' => $tour,
            'user' => Auth::user(),
            'selection' => $data,
            'occupiedSeats' => $occupiedSeats,
        ]);
    }

    public function store(Request $request, $slug)
    {
        $user = Auth::user();

        $tour = Tour::where('slug', $slug)->firstOrFail();

        if (! $tour->is_active) {
            return back()->withErrors([
                'booking' => 'This tour is unavailable.',
            ]);
        }
        $bookedCount = $tour->booked_seats;
        $availableSeats = $tour->total_seats - $bookedCount;

        if ($availableSeats <= 0) {
            return back()->withErrors([
                'booking' => 'The tour is sold out',
            ]);
        }

        $data = $request->validate([
            'adults' => 'required|integer|min:0',
            'couples' => 'required|integer|min:0',
            'payment' => 'required|in:full,partial',
            'note' => 'nullable|string|max:1000',
            'number' => ['required', 'digits:11'],
            'name' => ['required', 'string', 'max:255'],
            'seats' => ['required', 'array', 'min:1'],
            'seats.*' => ['required', 'string', 'regex:/^[A-J][1-4]$/'],
        ]);

        $adultsCount = $data['adults'];
        $couplesCount = $data['couples'];
        $requestedSeats = $adultsCount + ($couplesCount * 2);

        if (count($data['seats']) !== $requestedSeats) {
            return back()->withErrors([
                'booking' => "Selected seats count must be exactly {$requestedSeats}.",
            ]);
        }

        $occupiedSeats = Booking::where('tour_id', $tour->id)
            ->where('status', 'active')
            ->pluck('seats')
            ->filter()
            ->flatten()
            ->toArray();

        $alreadyTaken = array_intersect($data['seats'], $occupiedSeats);
        if (! empty($alreadyTaken)) {
            return back()->withErrors([
                'booking' => 'Some selected seats are already booked: '.implode(', ', $alreadyTaken),
            ]);
        }

        if ($requestedSeats > $availableSeats) {
            return back()->withErrors([
                'booking' => "Only {$availableSeats} seat(s) left. Please reduce your selection.",
            ]);
        }

        if ($adultsCount + $couplesCount === 0) {
            return back()->withErrors([
                'booking' => 'Select at least one passenger.',
            ]);
        }

        if (($adultsCount > 0 && is_null($tour->adult_price)) ||
            ($couplesCount > 0 && is_null($tour->couple_price))
        ) {
            return back()->withErrors([
                'booking' => 'The requested ticket tier options are invalid for this tour.',
            ]);
        }

        if (now() > $tour->booking_ends_at) {
            return back()->withErrors([
                'booking' => 'Booking closed. ',
            ]);
        }
        $totalAmount =
            $adultsCount * $tour->adult_price +
            $couplesCount * $tour->couple_price;

        try {
            $booking = DB::transaction(function () use ($tour, $data, $adultsCount, $couplesCount, $totalAmount) {
                $occupiedSeats = Booking::where('tour_id', $tour->id)
                    ->where('status', 'active')
                    ->lockForUpdate()
                    ->pluck('seats')
                    ->filter()
                    ->flatten()
                    ->toArray();

                $alreadyTaken = array_intersect($data['seats'], $occupiedSeats);
                if (! empty($alreadyTaken)) {
                    throw new \Exception('Some selected seats were already booked while you were checking out: '.implode(', ', $alreadyTaken));
                }

                return Booking::create([
                    'tour_id' => $tour->id,
                    'user_id' => Auth::id(),
                    'booking_code' => strtoupper(Str::random(10)),

                    'adult_count' => $adultsCount,
                    'couple_count' => $couplesCount,
                    'seats' => $data['seats'],

                    'total_amount' => $totalAmount,
                    'paid_amount' => 0,

                    'status' => 'active',

                    'note' => $data['note'] ?? null,
                ]);
            });
        } catch (\Exception $e) {
            return back()->withErrors([
                'booking' => $e->getMessage(),
            ]);
        }

        $user->update([
            'number' => $data['number'],
            'name' => $data['name'],
        ]);

        return redirect("/bookings/{$booking->booking_code}/pay?payment={$data['payment']}");
    }
}
