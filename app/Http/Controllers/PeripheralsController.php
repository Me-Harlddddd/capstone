<?php

namespace App\Http\Controllers;

use App\Models\Peripherals;
use App\Models\Rooms;
use App\Models\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Validation\Rule;

class PeripheralsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Peripherals::with('room', 'unit');

        // Filter by room
        if ($request->filled('room_id')) {
            $query->where('room_id', $request->room_id);
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('peripherals_code', 'like', '%' . $request->search . '%')
                  ->orWhere('type', 'like', '%' . $request->search . '%')
                  ->orWhere('serial_number', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $peripherals = $query->paginate(10)->withQueryString();
        $rooms = Rooms::all();

        return Inertia::render('admin/Peripherals/Peripherals', [
            'peripherals' => $peripherals,
            'rooms' => $rooms,
            'filters' => $request->only(['search', 'room_id', 'type', 'sort_field', 'sort_direction']),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
        $rooms = Rooms::all(['id', 'room_name']);
        $units = Units::all(['id', 'unit_code', 'room_id']);

        
        return Inertia::render('admin/Peripherals/CreatePeripherals', [
            'rooms' => $rooms,
            'units' => $units,
            'flash' => [
                'success' =>session('success'),
            ],
            ]);

  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validate = $request->validate([
            'peripherals_code' => [
                'required',
                Rule::unique('peripherals')->where(function ($query) use ($request) {
                    return $query->where('room_id', $request->room_id)
                    ->where('unit_id', $request->unit_id);
                }),
            ],
            'room_id' => 'required |exists:rooms,id',
            'unit_id' => 'required |exists:units,id' ,
            'type' => 'required |in:Mouse,Keyboard',
            'brand' => 'required',
            'model' => 'required',
            'serial_number' => 'required',
            'condition' => 'required',
            
        ]);

        //Prevent to duplicate peripherals of the same type of on a unit


        $existsPeripherals = Peripherals::where('unit_id', $validate['unit_id'])->where('type', $validate['type'])->exists();

        if($existsPeripherals){
            return back()->withErrors([
                'type' => 'This unit already hase a '. $validate['type']. '',
            ])->withInput();
        }

        $peripherals = Peripherals::create($validate);
        $room = Rooms::find($request->room_id);
        $unit = Units::find($request->unit_id);

        $qrText = "Peripheral Code: {$peripherals->peripherals_code}\nRoom: {$room->room_name}\nUnit: {$unit->unit_code}";

        // Generate QR PNG
        $qrCodeSvg = QrCode::format('svg')->size(400)->generate($qrText);

        storage::disk('public')->makeDirectory('qr_codes');
        $fileName = 'QR_Peripheral_' . $peripherals->peripherals_code . '.svg';
        $path = 'qr_codes/' .$fileName;

        Storage::disk('public')->put($path, $qrCodeSvg);

        $peripherals->update([
            'qr_code_path' => $path,
        ]);

          return redirect()->route('admin.peripherals.create')->with('success', 'Peripheral created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Peripherals $peripherals)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Peripherals $peripherals)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Peripherals $peripherals)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peripherals $peripherals)
    {
        //
        $peripherals->delete();

        return redirect()->route('admin.peripherals.index')->with('success', 'Peripherals Deleted Successfully');
    }
}
