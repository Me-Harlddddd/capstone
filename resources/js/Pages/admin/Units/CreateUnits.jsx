import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AlertSuccess from '@/Components/AlertSuccess';


export default function CreateUnit() {
     const { flash, rooms = [] } = usePage().props; 
    const [showSuccess, setShowSuccess] = useState(!!flash.success);

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_code: '',
        room_id: '',
        unit_number: '',
        processor: '',
        ram: '',
        storage: '',
        motherboard: '',
        gpu: '',
        condition: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.units.store'), {
            onSuccess: () =>{
        AlertSuccess('Unit added successfully');
            reset();
            } 
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Unit</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Room dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Room</label>
                        <select
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
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

                    {/* Unit Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Code</label>
                            <input
                                type="text"
                                value={data.unit_code}
                                onChange={(e) => setData('unit_code', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 font-mono"
                                placeholder="e.g. UNIT001"
                            />
                            {errors.unit_code && <p className="text-red-500 text-sm mt-1">{errors.unit_code}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                            <input
                                type="text"
                                value={data.unit_number}
                                onChange={(e) => setData('unit_number', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                                placeholder="e.g. PC-01"
                            />
                            {errors.unit_number && <p className="text-red-500 text-sm mt-1">{errors.unit_number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                            <input
                                type="text"
                                value={data.processor}
                                onChange={(e) => setData('processor', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.processor && <p className="text-red-500 text-sm mt-1">{errors.processor}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">RAM</label>
                            <input
                                type="text"
                                value={data.ram}
                                onChange={(e) => setData('ram', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.ram && <p className="text-red-500 text-sm mt-1">{errors.ram}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Storage</label>
                            <input
                                type="text"
                                value={data.storage}
                                onChange={(e) => setData('storage', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.storage && <p className="text-red-500 text-sm mt-1">{errors.storage}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Motherboard</label>
                            <input
                                type="text"
                                value={data.motherboard}
                                onChange={(e) => setData('motherboard', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.motherboard && <p className="text-red-500 text-sm mt-1">{errors.motherboard}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GPU</label>
                            <input
                                type="text"
                                value={data.gpu}
                                onChange={(e) => setData('gpu', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.gpu && <p className="text-red-500 text-sm mt-1">{errors.gpu}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <input
                                type="text"
                                value={data.condition}
                                onChange={(e) => setData('condition', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-3"
                            />
                            {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition shadow-md disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Unit'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
