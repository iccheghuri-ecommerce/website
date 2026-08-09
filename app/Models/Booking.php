<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    //
    protected $guarded = [];

    protected $casts = [
        'seats' => 'array',
    ];

    public function travelers()
    {
        return $this->hasMany(Traveler::class);
    }

    /**
     * @return BelongsTo<Tour, $this>
     */
    public function tour()
    {
        return $this->belongsTo(Tour::class, 'tour_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
