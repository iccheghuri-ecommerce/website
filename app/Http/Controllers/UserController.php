<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();

        $bookings = $user->bookings()
            ->with('tour')
            ->latest()
            ->take(10)
            ->get();

        $payments = $user->payments()
            ->with('booking.tour')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Profile/Index', [
            'user' => $user,
            'bookings' => $bookings,
            'payments' => $payments,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'number' => ['required', 'digits:11'],
            'nid_no' => ['required', 'string', 'max:255'],
            'blood_group' => ['required', 'string', 'max:5'],
            'address' => ['required', 'string', 'max:1000'],
            'emergency_contact' => ['required', 'string', 'max:255'],
        ]);

        $user->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }
}
