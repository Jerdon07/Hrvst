<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sitio extends Model
{
    protected $fillable = [
        'barangay_id',
        'name',
    ];

    public function barangay()
    {
        return $this->belongsTo(Barangay::class);
    }

    public function farmers()
    {
        return $this->hasMany(Farmer::class);
    }
}
