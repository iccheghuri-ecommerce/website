<?php

namespace App\Models;

use Database\Factories\TourFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tour extends Model
{
    /** @use HasFactory<TourFactory> */
    use HasFactory;

    protected $guarded = [];

    /**
     * @var int
     */
    public $booked_seats_count;

    /**
     * @var int
     */
    public $total_revenue;

    protected $appends = ['booked_seats_count', 'total_revenue'];

    public function getBookedSeatsCountAttribute()
    {
        return $this->booked_seats;
    }

    public function getTotalRevenueAttribute()
    {
        return $this->bookings()->where('status', 'active')->sum('paid_amount');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * @return HasMany<Booking, $this>
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getBookedSeatsAttribute()
    {
        return $this->bookings()
            ->where('status', 'active')
            ->get()
            ->sum(function ($booking) {
                return count($booking->seats ?? []);
            });
    }
}
