import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router, usePage } from '@inertiajs/react';

export default function Units() {
    const { units, rooms, filters } = usePage().props;

    const handleSearchChange = (e) => {
        router.get(route('admin.units.index'), {
            ...filters,
            search: e.target.value,
        }, { preserveState: true });
    };

    const handleRoomFilter = (e) => {
        router.get(route('admin.units.index'), {
            ...filters,
            room_id: e.target.value,
        }, { preserveState: true });
    };

    const handleSort = (field) => {
        const direction = filters.sort_direction === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.units.index'), {
            ...filters,
            sort_field: field,
            sort_direction: direction,
        }, { preserveState: true });
    };

    const handleAddUnit = () => router.visit('/admin/units/create');

    const handleEdit = (id) => router.visit(`/admin/units/edit/${id}`);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this unit?')) {
            router.delete(`/admin/units/${id}`);
        }
    };


    const [selectedQR, setSelectedQR] = useState(null)
    const [copied, setCopied] = useState(false);

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Units</h1>
                <button
                    onClick={handleAddUnit}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                    + Add Unit
                </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div className="flex flex-row gap-2 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Search unit code or number..."
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
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('unit_code')}>Unit Code</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('unit_number')}>Unit Number</th>
                            <th className="px-4 py-3 border">Processor</th>
                            <th className="px-4 py-3 border">RAM</th>
                            <th className="px-4 py-3 border">Storage</th>
                            <th className="px-4 py-3 border">GPU</th>
                            <th className="px-4 py-3 border">Motherboard</th>
                            <th className="px-4 py-3 border">Condition</th>
                            <th className="px-4 py-3 border">QR Code</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.data.length > 0 ? (
                            units.data.map((unit) => (
                                <tr key={unit.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border font-mono text-gray-600">{unit.id}</td>
                                    <td className="px-4 py-2 border font-mono text-blue-700">{unit.unit_code}</td>
                                    <td className="px-4 py-2 border">{unit.unit_number}</td>
                                    <td className="px-4 py-2 border">{unit.processor}</td>
                                    <td className="px-4 py-2 border">{unit.ram}</td>
                                    <td className="px-4 py-2 border">{unit.storage}</td>
                                    <td className="px-4 py-2 border">{unit.gpu}</td>
                                    <td className="px-4 py-2 border">{unit.motherboard}</td>
                                    <td className="px-4 py-2 border">{unit.condition}</td>
                                    <td className="px-4 py-2 border">
                                        {unit.qr_code_path ? (
                                             <img       
                                        src={`/storage/${unit.qr_code_path}`}
                                        alt="QR Code"
                                        className="w-12 h-12 object-contain cursor-pointer"
                                        onClick={() =>
                                            setSelectedQR({
                                                image: `/storage/${unit.qr_code_path}`,
                                                unit_name: unit.unit_number,
                                                unit_code: unit.unit_code,
                                            })
                                        }

                                        />
                                        ) : (
                                            <span className="text-gray-400 italic">No QR</span>
                                        )}
                                    </td>
                                   <td className="px-4 py-2 border text-center space-x-4">
                                <button
                                    onClick={() => handleEdit(unit.id)}
                                    className="inline-flex items-center text-blue-600 hover:underline"
                                >
                                    Edit
                                    <PencilSquareIcon className="w-4 h-4 ml-1 text-blue-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(unit.id)}
                                    className="inline-flex items-center text-red-600 hover:underline"
                                >
                                    Delete
                                    <TrashIcon className="w-4 h-4 ml-1 text-red-600" />
                                </button>
                            </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="px-4 py-4 text-center text-gray-500 italic">
                                    No matching units found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex gap-2 flex-wrap text-sm">
                {units.links.map((link, i) => (
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
                Showing {units.from} to {units.to} of {units.total} units
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
                        <p><span className="font-semibold">Unit Number:</span> {selectedQR.unit_name}</p>
                        <p><span className="font-semibold">Unit Code:</span> {selectedQR.unit_code}</p>
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
