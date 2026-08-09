<?php

namespace App\Models;

use Database\Factories\TourFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tour extends Model
{
    /** @use HasFactory<TourFactory> */
    use HasFactory;

    protected $guarded = [];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getBookedSeatsAttribute()
    {
        return $this->bookings()
            ->where('status', 'active')
            ->sum(DB::raw('adult_count + (couple_count * 2)'));
    }
}
