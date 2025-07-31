<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('room_equipments', function (Blueprint $table) {
            //
            $table->dropUnique(['room_equipment_code']);

            $table->unique(['room_equipment_code', 'room_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('room_equipments', function (Blueprint $table) {
            //
             $table->dropUnique(['room_equipment_code', 'room_id']);
               $table->unique(['room_equipment_code']);
        });
    }
};
