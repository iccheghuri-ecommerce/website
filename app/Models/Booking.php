<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //
    protected $guarded = [];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
