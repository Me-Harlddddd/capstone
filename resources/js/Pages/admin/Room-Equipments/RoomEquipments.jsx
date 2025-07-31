import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router, usePage } from '@inertiajs/react';
import ConfirmDelete from '@/Components/ConfirmDelete';
import AlertSuccess from '@/Components/AlertSuccess';

export default function RoomEquipments() {
    const { equipments, rooms, filters } = usePage().props;

    const handleSearchChange = (e) => {
        router.get(route('admin.room-equipments.index'), {
            ...filters,
            search: e.target.value,
        }, { preserveState: true });
    };

    const handleRoomFilter = (e) => {
        router.get(route('admin.room-equipments.index'), {
            ...filters,
            room_id: e.target.value,
        }, { preserveState: true });
    };

    const handleSort = (field) => {
        const direction = filters.sort_direction === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.room-equipments.index'), {
            ...filters,
            sort_field: field,
            sort_direction: direction,
        }, { preserveState: true });
    };

    const handleAdd = () => router.visit('/admin/Room-Equipments/create');

    const handleEdit = (id) => router.visit(`/admin/room-equipments/edit/${id}`);

    const handleDelete = (id) => {
    ConfirmDelete('This equipment will be permanently removed.').then((result) => {
    if (result.isConfirmed) {
      router.delete(`/admin/Room-Equipments/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          AlertSuccess('Equipment deleted successfully');
        },
        onError: () => {
         
        },
      });
    }
  });
};

const [selectedQR, setSelectedQR] = useState(null);
const [copied, setCopied] = useState(false);
    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Room Equipments</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                    + Add Equipment
                </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div className="flex flex-row gap-2 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Search equipment code or type..."
                        className="px-4 py-2 border rounded-md w-full shadow-sm"
                        value={filters.search || ''}
                        onChange={handleSearchChange}
                    />

                    <select
                        className="px-7 py-2 border rounded-md shadow-sm w-65"
                        value={filters.room_id || ''}
                        onChange={handleRoomFilter}
                    >
                        <option value="">All Rooms</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                                {room.room_name} ({room.room_code})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('id')}>ID</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('room_equipment_code')}>Room Equipment Code</th>
                            
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('brand')}>Brand</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('condition')}>Condition</th>
                            <th className="px-4 py-3 border">Room</th>
                            <th className="px-4 py-3 border">QR Code</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.data.length > 0 ? (
                            equipments.data.map((equipment) => (
                                <tr key={equipment.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border font-mono text-gray-600">{equipment.id}</td>
                                    <td className="px-4 py-2 border font-mono text-blue-700">{equipment.room_equipment_code}</td>
                                    
                                    <td className="px-4 py-2 border">{equipment.type}</td>
                                    <td className="px-4 py-2 border">{equipment.brand}</td>
                                    <td className="px-4 py-2 border">{equipment.condition}</td>
                                    <td className="px-4 py-2 border">{equipment.room?.room_name || '—'}</td>
                                    <td className="px-4 py-2 border">
                                        {equipment.qr_code_path ? (
                                             <img
                                        src={`/storage/${equipment.qr_code_path}`}
                                        alt="QR Code"
                                        className="w-12 h-12 object-contain cursor-pointer"
                                        onClick={() =>
                                            setSelectedQR({
                                                image: `/storage/${equipment.qr_code_path}`,
                                                equipment_name: equipment.type,
                                                equipment_code: equipment.room_equipment_code,
                                            })
                                        }

                                        />
                                        ) : (
                                            <span className="text-gray-400 italic">No QR</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center whitespace-nowrap space-x-4">
                                    <button
                                        onClick={() => handleEdit(equipment.id)}
                                        className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(equipment.id)}
                                        className="inline-flex items-center text-red-600 hover:underline"
                                    >
                                        <TrashIcon className="w-4 h-4 mr-1" />
                                        Delete
                                    </button>
                                </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-4 text-center text-gray-500 italic">
                                    No equipment found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex gap-2 flex-wrap text-sm">
                {equipments.links.map((link, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : ''}`}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Showing {equipments.from} to {equipments.to} of {equipments.total} items
            </div>
             {selectedQR && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => {
                    setSelectedQR(null);
                    setCopied(false);
                    }}
                >
                    <div
                    className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl text-center relative"
                    onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                    >
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">QR Code</h2>
                    <img
                        src={selectedQR.image}
                        alt="Large QR"
                        className="w-72 h-72 mx-auto cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                        navigator.clipboard.writeText(selectedQR.url).then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        });
                        }}
                    />
                    <p className="text-sm text-gray-500 mt-2">Click the QR to copy the room URL</p>

                    {copied && (
                        <div className="mt-2 text-green-600 text-sm">Link copied to clipboard!</div>
                    )}

                    {/* Room Name and Code */}
                    <div className="mt-6 text-gray-700">
                        <p><span className="font-semibold">Room Equipment Type:</span> {selectedQR.equipment_name}</p>
                        <p><span className="font-semibold">Room Equipment  Code:</span> {selectedQR.equipment_code}</p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => {
                        setSelectedQR(null);
                        setCopied(false);
                        }}
                        className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
                    >
                        &times;
                    </button>
                    </div>
                </div>
                )}
        </AdminLayout>
    );
}
