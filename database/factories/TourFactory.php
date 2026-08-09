<?php

namespace Database\Factories;

use App\Models\Tour;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tour>
 */
class TourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'slug' => fake()->unique()->slug(),
            'short_description' => fake()->paragraph(),
            'description' => fake()->paragraphs(5, true),
            'thumbnail' => 'https://picsum.photos/seed/'.fake()->uuid().'/800/600',
            'is_featured' => fake()->boolean(20),
            'is_active' => true,
            'booking_ends_at' => now()->addDays(15),
            'departure_at' => now()->addMonth(),
            'return_at' => now()->addMonth()->addDays(5),
            'total_seats' => 40,
            'adult_price' => fake()->numberBetween(5000, 25000),
            'couple_price' => fake()->optional()->numberBetween(9000, 45000),
            'minimum_booking_amount' => fake()->optional()->numberBetween(1000, 5000),
        ];
    }
}
