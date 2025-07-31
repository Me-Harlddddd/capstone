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
        Schema::create('room_equipments', function (Blueprint $table) {
            $table->id();
            $table->unique('room_equipment_code', 'room_id');
            $table->unsignedBigInteger('room_id');
            $table->string('type');
            $table->string('brand');
            $table->string('condition');
            $table->string('qr_code_path')->nullable();
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_equipments');
    }
};
