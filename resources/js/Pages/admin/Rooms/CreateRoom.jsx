import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'
import AlertSuccess from '@/Components/AlertSuccess';

export default function CreateRoom() {
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);

    const { data, setData, post, processing, errors, reset } = useForm({
        room_name: '',
        room_code: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowSuccess(true);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.rooms.store'), {
            onSuccess: () =>{
              AlertSuccess('Room added successfully');  
                reset();
            } 
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">

               

                <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Room</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                        <input
                            type="text"
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                            value={data.room_name}
                            onChange={(e) => setData('room_name', e.target.value)}
                            placeholder="e.g. ICT Room"
                        />
                        {errors.room_name && <p className="text-red-500 text-sm mt-1">{errors.room_name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Code</label>
                        <input
                            type="text"
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 font-mono focus:ring-blue-500 focus:border-blue-500"
                            value={data.room_code}
                            onChange={(e) => setData('room_code', e.target.value)}
                            placeholder="e.g. ROOM123"
                        />
                        {errors.room_code && <p className="text-red-500 text-sm mt-1">{errors.room_code}</p>}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition shadow-md disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Room'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
