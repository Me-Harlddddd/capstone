<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    protected $fillable = ['room_name', 'room_code', 'qr_code_path'];

    // ✅ Correct relationships
    public function units()
    {
        return $this->hasMany(Units::class, 'room_id');
    }

    public function equipments()
    {
        return $this->hasMany(RoomEquipments::class, 'room_id');
    }

    public function peripherals()
    {
        return $this->hasMany(Peripherals::class, 'room_id');
    }
}
