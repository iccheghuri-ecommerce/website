<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Traveler extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return BelongsTo<Booking, $this>
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
