import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AlertSuccess from '@/Components/AlertSuccess';


export default function CreateRoomEquipment() {
    const { flash, rooms } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);

    const { data, setData, post, processing, errors, reset } = useForm({
        room_equipment_code: '',
        room_id: '',
        type: '',
        brand: '',
        condition: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.room-equipments.store'), {
            forceFormData: true,
            onSuccess: () =>{
            AlertSuccess('Room Equipment added successfully');   
            reset();
            } 
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">

    

                <h2 className="text-3xl font-bold mb-8">Add Room Equipment</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            className="w-full border rounded-md p-3"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                        >
                            <option value="">-- Select Type --</option>
                            <option value="chair">Chair</option>
                            <option value="aircon">Aircon</option>
                            <option value="table">Table</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>
                    {/* Equipment Code */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Equipment Code</label>
                        <input
                            type="text"
                            className="w-full border rounded-md p-3"
                            value={data.room_equipment_code}
                            onChange={(e) => setData('room_equipment_code', e.target.value)}
                            placeholder="e.g. EQP-001"
                        />
                        {errors.room_equipment_code && <p className="text-red-500 text-sm mt-1">{errors.room_equipment_code}</p>}
                    </div>
                       {/* Type */}
                    
                      {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Brand</label>
                        <input
                            type="text"
                            className="w-full border rounded-md p-3"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                            placeholder=""
                        />
                        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                    </div>

                      {/* Condition */}
                  
                        <div>
                            <label className="block text-sm font-medium mb-1">Condition</label>
                            <input
                                type="text"
                                className="w-full border rounded-md p-3"
                                value={data.condition}
                                onChange={(e) => setData('condition', e.target.value)}
                                placeholder="Needs Repair"
                            />
                            {errors.condition && (
                                <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
                            )}
                        </div>


                    {/* Room Select */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Room</label>
                        <select
                            className="w-full border rounded-md p-3"
                            value={data.room_id}
                            onChange={(e) => setData('room_id', e.target.value)}
                        >
                            <option value="">-- Select Room --</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.room_name} ({room.room_code})
                                </option>
                            ))}
                        </select>
                        {errors.room_id && <p className="text-red-500 text-sm mt-1">{errors.room_id}</p>}
                    </div>

                 

                  

                  
                   

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Equipment'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
