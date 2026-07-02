<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;

Route::get('/',[HomeController::class, 'index'])->name('home');

Route::get('/auth/google/redirect', [SocialController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [SocialController::class, 'callback']);
