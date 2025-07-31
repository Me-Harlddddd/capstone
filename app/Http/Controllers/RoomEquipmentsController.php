<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\RoomEquipments;
use App\Models\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
class RoomEquipmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $query = RoomEquipments::with('room');

        //filtering by Room
        if($request->filled('room_id')){
            $query->where('room_id', $request->room_id);
        }

        //Searching For Room Equipments

        if($request->filled('search')){
            $query->where(function($q) use ($request){
                $q->where('room_equipment_code', 'like' , '%' . $request->search . '%');
            });
        }

        $room_equipments = $query->paginate(10)->withQueryString();
        $rooms = Rooms::all();

        return Inertia::render('admin/Room-Equipments/RoomEquipments' ,[
            'equipments' => $room_equipments,
            'rooms' => $rooms,
            'filters' =>$request->only(['search' , 'room_id', 'sort_field' ,'sort_direction']),
        ]);
       
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $rooms = Rooms::all();

        return Inertia::render('admin/Room-Equipments/CreateRoomEquipments', [
            'rooms' => $rooms,
            'flash' =>[
                'success' => session('success'),
            ]
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'room_equipment_code' => 'required | unique:room_equipments',
            'room_id' => 'required |exists:rooms,id',
            'type' => 'required',
            'brand' => 'required',
            'condition' => 'required',
        ]);

        $equipments = RoomEquipments::create($validate);
        $rooms = Rooms::find($request->room_id);


        //Qr Content

        $qrText = "Room Equiment Code: {$equipments->room_equipment_code} \nType: {$equipments->type} \nRoom: {$rooms->room_name}";
        
        //Generate Qr Png
        $qrCodeSvg = QrCode::format('svg')->size(400)->generate($qrText);


        $filename = 'Room Equipments ' . $equipments->room_equipment_code .  $equipments->type . '.svg';
        $path = 'qr_codes/' .$filename;

        Storage::disk('public')->put($path, $qrCodeSvg);

        //Update the Qr path in the record
        $equipments->update([
            'qr_code_path' => $path,
        ]);

        return redirect()->route('admin.room-equipments.create')->with('success', 'Room Equipments created Successfully');


    }

    /**
     * Display the specified resource.
     */
    public function show(RoomEquipments $roomEquipments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomEquipments $roomEquipments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomEquipments $roomEquipments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomEquipments $roomEquipments)
    {
        //
        $roomEquipments->delete();

        return redirect()->route('admin.room-equipments.index');
    }
}
