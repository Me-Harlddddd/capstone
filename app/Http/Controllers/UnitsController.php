<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Units;
use App\Models\Rooms; // 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UnitsController extends Controller
{
public function index(Request $request)
{
    $query = Units::with('room');

    // Filtering by room
    if ($request->filled('room_id')) {
        $query->where('room_id', $request->room_id);
    }

    // Searching
    if ($request->filled('search')) {
        $query->where(function ($q) use ($request) {
            $q->where('unit_code', 'like', '%' . $request->search . '%')
              ->orWhere('unit_number', 'like', '%' . $request->search . '%');
        });
    }

    // Sorting
    $sortField = $request->get('sort_field', 'unit_code');
    $sortDirection = $request->get('sort_direction', 'asc');
    $query->orderBy($sortField, $sortDirection);

    $units = $query->paginate(10)->withQueryString();
    $rooms = Rooms::all();

    return Inertia::render('admin/Units/Units', [
        'units' => $units,
        'rooms' => $rooms,
        'filters' => $request->only(['search', 'room_id', 'sort_field', 'sort_direction']),
    ]);
}



    public function create()
    {
        $rooms = Rooms::all(); //  Works now with the import

        return Inertia::render('admin/Units/CreateUnits', [
            'rooms' => $rooms,
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'unit_code' => 'required | unique:units',
            'room_id' => 'required |exists:rooms,id',
            'unit_number' => 'required',
            'processor' => 'required',
            'ram' => 'required',
            'storage' => 'required',
            'motherboard' => 'required',
            'gpu' => 'required',
            'condition' => 'required',
           
        ]);
        $unit = Units::create($validate);
        $room = Rooms::find($request->room_id);

    // QR Content
    $qrText = "Unit Code: {$unit->unit_code}\nRoom: {$room->room_name}";

    // Generate QR PNG
    $qrCodePng = QrCode::format('png')->size(350)->generate($qrText);

    $imagick = new \Imagick();
    $imagick->readImageBlob($qrCodePng);
    $imagick->setImageFormat('png');

    $fileName = 'qr_unit_' . $unit->unit_code . '.png';
    $path = 'qr_codes/' . $fileName;

    Storage::disk('public')->put($path, $imagick->getImageBlob());

    // Update the QR path in the record
    $unit->update([
        'qr_code_path' => $path,
    ]);

        return redirect()->route('admin.units.create')->with('success', 'Unit created successfully.');
    }

    public function show(Units $units)
    {
        //
    }

    public function edit(Units $units)
    {
        //
    }

    public function update(Request $request, Units $units)
    {
        //
    }

    public function destroy(Units $units)
    {
        //
    }
}
