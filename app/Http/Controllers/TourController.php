<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourController extends Controller
{
    //
    public function index(Request $request)
    {
        $tours = Tour::active();

        if ($request->filled('q')) {
            $tours->where('title', 'like', '%'.$request->q.'%');
        }

        return Inertia::render('Tours/Index', [
            'tours' => $tours->paginate(6)->withQueryString(),
            'q' => $request->q,
        ]);
    }

    public function show($slug)
    {
        $tour = Tour::where('slug', $slug)->firstOrFail();

        $tour->append('booked_seats');

        return Inertia::render('Tours/Show', [
            'tour' => $tour,
        ]);
    }
}
