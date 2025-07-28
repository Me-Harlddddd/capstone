<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomEquipments extends Model
{
    //

    protected $fillable = ['room_equipment_code', 'room_id', 'type', 'brand', 'condition', 'qr_code_path'];

       public function room()
    {
        return $this->belongsTo(Rooms::class);
    }
}
