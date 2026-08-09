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

Route::middleware('auth')->group(function () {
    Route::get('/tours/{slug}/book', [BookingController::class, 'index']);
    Route::post('/tours/{slug}/book', [BookingController::class, 'store']);

    Route::get('/bookings/{booking_code}/pay', [PaymentController::class, 'index']);
    Route::post('/bookings/{booking_code}/pay', [PaymentController::class, 'store']);

    Route::get('/profile', [UserController::class, 'index'])->name('profile');
    Route::patch('/profile', [UserController::class, 'update']);

    Route::post('/logout', [SocialController::class, 'logout'])->name('logout');
});
Route::middleware('guest')->group(function () {
    Route::get('/login', [SocialController::class, 'login'])->name('login');
    Route::get('/auth/google/redirect', [SocialController::class, 'redirect'])->name('auth.google.redirect');
    Route::get('/auth/google/callback', [SocialController::class, 'callback']);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/tours', [App\Http\Controllers\Admin\TourController::class, 'index'])->name('tours.index');
    Route::get('/tours/create', [App\Http\Controllers\Admin\TourController::class, 'create'])->name('tours.create');
    Route::post('/tours', [App\Http\Controllers\Admin\TourController::class, 'store'])->name('tours.store');
    Route::get('/tours/{tour}/edit', [App\Http\Controllers\Admin\TourController::class, 'edit'])->name('tours.edit');
    Route::put('/tours/{tour}', [App\Http\Controllers\Admin\TourController::class, 'update'])->name('tours.update');
    Route::delete('/tours/{tour}', [App\Http\Controllers\Admin\TourController::class, 'destroy'])->name('tours.destroy');

    Route::get('/bookings', [App\Http\Controllers\Admin\BookingController::class, 'index'])->name('bookings.index');
    Route::put('/bookings/{booking}', [App\Http\Controllers\Admin\BookingController::class, 'update'])->name('bookings.update');

    Route::get('/payments', [App\Http\Controllers\Admin\PaymentController::class, 'index'])->name('payments.index');
    Route::put('/payments/{payment}', [App\Http\Controllers\Admin\PaymentController::class, 'update'])->name('payments.update');

    Route::get('/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::put('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
});
