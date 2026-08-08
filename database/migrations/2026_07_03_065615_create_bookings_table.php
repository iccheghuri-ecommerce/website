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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tour_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('booking_code')->unique();

            $table->unsignedTinyInteger('adult_count')->default(0);
            $table->unsignedTinyInteger('child_count')->default(0);
            $table->unsignedTinyInteger('couple_count')->default(0);

            $table->unsignedInteger('total_amount');
            $table->unsignedInteger('paid_amount')->default(0);

            $table->enum('status', [
                'active',
                'cancelled',
                'completed',
            ])->default('active');

            $table->text('admin_note')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
