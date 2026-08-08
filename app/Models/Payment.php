<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    //
    protected $guarded = [];

    /**
     * @return BelongsTo<Booking, $this>
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
