<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;




class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index()
{
    $rooms = Rooms::all();

    return Inertia::render('admin/Rooms/room', [
        'rooms' => $rooms,
        'flash' => [
            'success' =>session('success')
        ]
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
       
    }

    /**
     * Store a newly created resource in storage.
     */


public function store(Request $request)
{
    // Validate input
    $validated = $request->validate([
        'room_name' => 'required|string|max:255',
        'room_code' => 'required|string|max:100|unique:rooms,room_code',
    ]);

    // Create the room
    $room = Rooms::create($validated);

    // Generate the full URL
    $url = url('/faculty/' . $room->room_code);

    // Generate QR code in SVG format
    $qrCodeSvg = QrCode::format('svg')->size(400)->generate($url);

    // Save SVG to storage/app/public/qr_codes
    $fileName = 'qr_' . $room->room_code . '.svg';
    $path = 'qr_codes/' . $fileName;
    Storage::disk('public')->put($path, $qrCodeSvg);

    // Update room with the QR code path
    $room->update([
        'qr_code_path' => $path,
    ]);

    return redirect()->route('admin.rooms.create')->with('success', 'Room added successfully.');
}


 

    /**
     * Display the specified resource.
     */
   
    public function show($roomCode)
{
    $room = Rooms::with(['units', 'equipments', 'peripherals'])->where('room_code', $roomCode)->firstOrFail();

        return Inertia::render('faculty/RoomDetails', [
            'room' => $room,
            'units' => $room->units, // Eager load in controller
            'peripherals' => $room->peripherals,
            'equipments' => $room->equipments
]);

}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rooms $rooms)
    {
        //
        return Inertia::render('admin/Rooms/EditRoom', [
            'room' => $rooms,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rooms $rooms)
    {
        //
        $validate = $request->validate([
            'room_name' =>  'required|string|max:255',
            'room_code' =>  'required|string|unique:rooms,room_code, ' . $rooms->id,


            
        ]);
        $rooms->update($validate);

        return redirect()->route('admin.rooms')->with('success', 'Room Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rooms $rooms)
    {
        //
        $rooms->delete();

        return redirect()->route('admin.rooms')->with('success', 'Room Deleted Successfully!');
    }
}
