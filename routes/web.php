<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{slug}', [TourController::class, 'show']);

Route::middleware('auth')->group(function (){
    Route::get('/tours/{slug}/book', [BookingController::class, 'index']);
    Route::post('/tours/{slug}/book', [BookingController::class, 'store']);

    Route::get('/bookings/{booking_code}/pay', [PaymentController::class, 'index']);
    Route::post('/bookings/{booking_code}/pay', [PaymentController::class, 'store']);

    Route::get('/profile', [UserController::class, 'index'])->name('profile');
    Route::patch('/profile', [UserController::class, 'update']);
});
Route::middleware('guest')->group(function () {
    Route::get('/login', [SocialController::class, 'login'])->name('login');
    Route::get('/auth/google/redirect', [SocialController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [SocialController::class, 'callback']);
});
