<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');

            $table->text('short_description');
            $table->longText('description');

            $table->string('thumbnail');

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);

            $table->datetime('booking_ends_at');
            $table->datetime('departure_at');
            $table->datetime('return_at');

            $table->unsignedSmallInteger('total_seats');

            $table->unsignedInteger('adult_price');
            $table->unsignedInteger('couple_price')->nullable();
            $table->unsignedInteger('child_price')->nullable();
            $table->unsignedInteger('minimum_booking_amount')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
