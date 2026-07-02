<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
