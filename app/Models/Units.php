<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Units extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'unit_code',
        'room_id',
        'unit_number',
        'processor',
        'ram',
        'storage',
        'motherboard',
        'gpu',
        'condition',
        'qr_code_path',
    ];

       public function room()
    {
        return $this->belongsTo(Rooms::class, 'room_id');
    }
}
