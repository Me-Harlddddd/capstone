<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Peripherals extends Model
{
    protected $fillable = [
        'peripherals_code', 'room_id', 'unit_id', 'type', 'brand', 'model', 'serial_number', 'condition', 'qr_code_path'
    ];

    public function room()
    {
        return $this->belongsTo(Rooms::class);
    }

    public function unit()
    {
        return $this->belongsTo(Units::class);
    }
}
