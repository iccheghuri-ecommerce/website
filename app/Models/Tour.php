<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tour extends Model
{
    /** @use HasFactory<\Database\Factories\TourFactory> */
    use HasFactory;

    function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
    function scopeActive($query)
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
            ->sum(DB::raw('adult_count + child_count + (couple_count * 2)'));
    }
    
}
