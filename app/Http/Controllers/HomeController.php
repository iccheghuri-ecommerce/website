<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Inertia\Inertia;

class HomeController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('welcome', [
            'featured' => Tour::featured()->active()->latest()->take(5)->get(),
        ]);
    }
}
