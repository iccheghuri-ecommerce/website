<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    //
    function index()
    {
        return Inertia::render('welcome', [
            'featured' => Tour::featured()->active()->latest()->take(5)->get(),
        ]);
    }
}
