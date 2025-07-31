<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('units', function (Blueprint $table) {
        // Drop the old unique key
        $table->dropUnique(['unit_code']);

        // Add composite unique key
        $table->unique(['unit_code', 'room_id']);
    });
}

public function down()
{
    Schema::table('units', function (Blueprint $table) {
        // Revert changes
        $table->dropUnique(['unit_code', 'room_id']);
        $table->unique('unit_code');
    });
}

};
