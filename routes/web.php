<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\TourController;
use Illuminate\Support\Facades\Route;

Route::get('/',[HomeController::class, 'index'])->name('home');

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{slug}', [TourController::class, 'show']);

Route::get('/auth/google/redirect', [SocialController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);
