import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePage, router } from '@inertiajs/react';
import ConfirmDelete from '@/Components/ConfirmDelete';
import AlertSuccess from '@/Components/AlertSuccess';


export default function Rooms({ rooms }) {
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(!!flash.success);
    const [search, setSearch] = useState('');

    const filteredRooms = rooms.filter(room =>
        room.room_name.toLowerCase().includes(search.toLowerCase()) ||
        room.room_code.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddRoom = () => {
        router.visit('/admin/rooms/create');
    };

    const handleEdit = (id) => {
        router.visit(`/admin/rooms/edit/${id}`);
    };

    const handleDelete = (id) => {
    ConfirmDelete('This room will be permanently removed.').then((result) => {
    if (result.isConfirmed) {
      router.delete(`/admin/rooms/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          AlertSuccess('Room deleted successfully');
        },
        onError: () => {
          // Optional: handle error with another alert
        }
      });
    }
  });
    }
    // Optional: Auto-hide flash after 3 seconds
    useEffect(() => {
        if (showSuccess) {
            const timeout = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [showSuccess]);

    return (
        <AdminLayout>
            {/* Flash Message at the top, centered */}
            {showSuccess && (
                <div className="w-full flex justify-center mt-6">
                    <div className="relative bg-green-100 border border-green-300 text-green-800 px-5 py-4 rounded-md shadow-md max-w-md w-full">
                        <span>{flash.success}</span>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="absolute top-2 right-3 text-xl leading-none font-bold text-green-800 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between mt-6">
                <h1 className="text-3xl font-bold">Rooms</h1>
                <button
                    onClick={handleAddRoom}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                    + Add Room
                </button>
            </div>

            {/* Search Input */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search room name or code..."
                    className="px-4 py-2 border rounded-md w-full max-w-xs shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Rooms Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 border">#</th>
                            <th className="px-6 py-3 border">Room Name</th>
                            <th className="px-6 py-3 border">Room Code</th>
                            <th className="px-6 py-3 border">QR Code</th>
                            <th className="px-6 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map((room, index) => (
                                <tr key={room.id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-3 border">{index + 1}</td>
                                    <td className="px-6 py-3 border font-medium text-gray-900">{room.room_name}</td>
                                    <td className="px-6 py-3 border">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-mono">
                                            {room.room_code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 border">
                                        {room.qr_code_path ? (
                                            <img
                                                src={`/storage/${room.qr_code_path}`}
                                                alt="QR Code"
                                                className="w-12 h-12 object-contain"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">No QR</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border text-center space-x-4">
                                        <button
                                            onClick={() => handleEdit(room.id)}
                                            className="inline-flex items-center text-blue-600 hover:underline"
                                        >
                                            <PencilSquareIcon className="w-4 h-4 ml-1 text-blue-600" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room.id)}
                                            className="inline-flex items-center text-red-600 hover:underline"
                                        >
                                            <TrashIcon className="w-4 h-4 ml-1 text-red-600" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 italic">
                                    No matching rooms found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            <div className="mt-4 text-sm text-gray-500">
                Showing {filteredRooms.length} of {rooms.length} rooms
            </div>
        </AdminLayout>
    );
}
