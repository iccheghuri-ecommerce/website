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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nid_no')->nullable()->after('number');
            $table->string('blood_group', 5)->nullable()->after('nid_no');
            $table->text('address')->nullable()->after('blood_group');
            $table->string('emergency_contact')->nullable()->after('address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nid_no', 'blood_group', 'address', 'emergency_contact']);
        });
    }
};
