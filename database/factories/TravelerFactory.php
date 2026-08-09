<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Traveler;
use Illuminate\Database\Eloquent\Factories\Factory;

class TravelerFactory extends Factory
{
    protected $model = Traveler::class;

    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'seat_number' => fake()->randomElement(['A1', 'A2', 'B1', 'B2']),
            'name' => fake()->name(),
            'phone' => '01'.fake()->numerify('#########'),
            'nid_no' => fake()->numerify('#############'),
            'blood_group' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'address' => fake()->address(),
            'emergency_contact' => '01'.fake()->numerify('#########'),
        ];
    }
}
