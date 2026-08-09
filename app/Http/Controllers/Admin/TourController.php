<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::latest()->paginate(10);

        $stats = [
            'total_tours' => Tour::count(),
            'active_tours' => Tour::active()->count(),
            'total_seats_booked' => Booking::where('status', 'active')->get()->sum(function ($b) {
                return count($b->seats ?? []);
            }),
            'total_potential_revenue' => Tour::active()->get()->sum(function ($t) {
                return $t->booked_seats * $t->adult_price;
            }),
        ];

        return Inertia::render('Admin/Tours/Index', [
            'tours' => $tours,
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tours/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:1000',
            'description' => 'required|string',
            'thumbnail' => 'required|image|max:2048',
            'is_featured' => 'required|boolean',
            'is_active' => 'required|boolean',
            'booking_ends_at' => 'required|date',
            'departure_at' => 'required|date|after:booking_ends_at',
            'return_at' => 'required|date|after:departure_at',
            'adult_price' => 'required|integer|min:0',
            'couple_price' => 'nullable|integer|min:0',
            'minimum_booking_amount' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('tours', 'public');
            $data['thumbnail'] = '/storage/'.$path;
        }

        $data['slug'] = Str::slug($data['title']).'-'.Str::random(5);
        $data['total_seats'] = 45; // Fixed seats as per requirements

        Tour::create($data);

        return redirect()->route('admin.tours.index')->with('success', 'Tour created successfully.');
    }

    public function edit(Tour $tour)
    {
        return Inertia::render('Admin/Tours/Edit', [
            'tour' => $tour,
        ]);
    }

    public function update(Request $request, Tour $tour)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string|max:1000',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'is_featured' => 'required|boolean',
            'is_active' => 'required|boolean',
            'booking_ends_at' => 'required|date',
            'departure_at' => 'required|date|after:booking_ends_at',
            'return_at' => 'required|date|after:departure_at',
            'adult_price' => 'required|integer|min:0',
            'couple_price' => 'nullable|integer|min:0',
            'minimum_booking_amount' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('tours', 'public');
            $data['thumbnail'] = '/storage/'.$path;
        } else {
            unset($data['thumbnail']);
        }

        $tour->update($data);

        return redirect()->route('admin.tours.index')->with('success', 'Tour updated successfully.');
    }

    public function destroy(Tour $tour)
    {
        $tour->delete();

        return redirect()->route('admin.tours.index')->with('success', 'Tour deleted successfully.');
    }
}
