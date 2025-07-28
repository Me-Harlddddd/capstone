import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage } from '@inertiajs/react';

export default function EditRoom({ room }) {
    const [roomName, setRoomName] = useState(room.room_name);
    const [roomCode, setRoomCode] = useState(room.room_code);
    const [errors, setErrors] = useState({});

    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/admin/rooms/${room.id}`, {
            room_name: roomName,
            room_code: roomCode,
        }, {
            onError: (err) => setErrors(err),
            onSuccess: () => setShowSuccess(true),
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
                
                <h2 className="text-xl font-semibold mb-4">Edit Room</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Room Name</label>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.room_name && <p className="text-red-600 text-sm">{errors.room_name}</p>}
                    </div>
                    <div>
                        <label className="block font-medium">Room Code</label>
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.room_code && <p className="text-red-600 text-sm">{errors.room_code}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Room
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
