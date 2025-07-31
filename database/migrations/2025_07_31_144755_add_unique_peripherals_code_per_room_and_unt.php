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
        Schema::table('peripherals', function (Blueprint $table) {
             // Drop the old unique key
            $table->dropUnique(['peripherals_code']);

            // Add composite unique key
            $table->unique(['peripherals_code', 'room_id','unit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('peripherals', function (Blueprint $table) {
            //
        $table->dropUnique(['peripherals_code', 'room_id','unit_id']);
        $table->unique('peripherals_code');
        });
    }
};
