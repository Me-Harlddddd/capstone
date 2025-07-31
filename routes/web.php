<?php

use App\Http\Controllers\PeripheralsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;

use App\Http\Controllers\RoomEquipmentsController;

use App\Http\Controllers\UnitsController;
use App\Models\Rooms;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Laravel welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public Admin Dashboard (no login required)


Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/admin_dashboard');
    })->name('admin.dashboard');

    // Route using RoomController
    Route::get('/rooms', [RoomController::class, 'index'])->name('admin.rooms');

    //Route for adding Rooms
    Route::get('/rooms/create', function(){
        return Inertia::render('admin/Rooms/CreateRoom');
    })->name('admin.rooms.create');
    Route::post('/rooms', [RoomController::class, 'store'])->name('admin.rooms.store');
    Route::get('/rooms/edit/{rooms}', [RoomController::class, 'edit'])->name('admin.rooms.edit');
    Route::put('/rooms/{rooms}', [RoomController::class, 'update'])->name('admin.rooms.update');
    Route::delete('/rooms/{rooms}', [RoomController::class, 'destroy'])->name('admin.rooms.destroy');


    //Route for adding Units
    Route::get('/units/create', [UnitsController::class, 'create'])->name('admin.units.create');

    Route::post('/units', [UnitsController::class, 'store'])->name('admin.units.store');
    Route::get('/units', [UnitsController::class, 'index'])->name('admin.units.index');


    //Route for showing Peripherals and Adding
    Route::get('/peripherals/create', [PeripheralsController::class, 'create'])->name('admin.peripherals.create');
    Route::post('/peripherals', [PeripheralsController::class, 'store'])->name('admin.peripherals.store');
    Route::get('/peripherals', [PeripheralsController::class, 'index'])->name('admin.peripherals.index');

    Route::delete('/peripherals/{peripherals}', [PeripheralsController::class, 'destroy'])->name('admin.peripherals.destroy');

    
    //Route For Showing and Adding Room Equipments
    Route::get('/Room-Equipments', [RoomEquipmentsController::class, 'index'])->name('admin.room-equipments.index');
    Route::get('/Room-Equipments/create', [RoomEquipmentsController::class, 'create'])->name('admin.room-equipments.create');
    Route::post('/Room-Equipments', [RoomEquipmentsController::class, 'store'])->name('admin.room-equipments.store');
     Route::delete('/Room-Equipments/{roomEquipments}', [RoomEquipmentsController::class, 'destroy'])->name('admin.room-equipments.destroy');
    


});

Route::get('/faculty/{roomCode}', [RoomController::class, 'show'])->name('rooms.show', );

// Authenticated dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes (requires login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
