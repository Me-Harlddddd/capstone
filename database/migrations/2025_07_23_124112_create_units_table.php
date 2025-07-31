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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->unique(['unit_code', 'room_id']); // ✅ Composite unique key

            $table->unsignedBigInteger('room_id');
            $table->string('unit_number');
            $table->string('processor');
            $table->string('ram');
            $table->string('storage');
            $table->string('motherboard');
            $table->string('gpu');
            $table->string(column: 'condition');
            $table->string(column: 'qr_code_path')->nullable();
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
