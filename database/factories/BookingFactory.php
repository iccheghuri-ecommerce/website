<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tour_id' => Tour::factory(),
            'user_id' => User::factory(),
            'booking_code' => strtoupper(Str::random(10)),
            'adult_count' => 1,
            'couple_count' => 0,
            'total_amount' => 1000,
            'paid_amount' => 0,
            'status' => 'active',
            'seats' => ['A1'],
        ];
    }
}
