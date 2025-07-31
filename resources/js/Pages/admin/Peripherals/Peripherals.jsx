import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router, usePage } from '@inertiajs/react';
import ConfirmDelete from '@/Components/ConfirmDelete';
import AlertSuccess from '@/Components/AlertSuccess';

export default function Peripherals() {
    const { peripherals, rooms, filters } = usePage().props;

    const handleSearchChange = (e) => {
        router.get(route('admin.peripherals.index'), {
            ...filters,
            search: e.target.value,
        }, { preserveState: true });
    };

    const handleRoomFilter = (e) => {
        router.get(route('admin.peripherals.index'), {
            ...filters,
            room_id: e.target.value,
        }, { preserveState: true });
    };

    const handleTypeFilter = (e) => {
        router.get(route('admin.peripherals.index'), {
            ...filters,
            type: e.target.value,
        }, { preserveState: true });
    };

    const handleSort = (field) => {
        const direction = filters.sort_direction === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.peripherals.index'), {
            ...filters,
            sort_field: field,
            sort_direction: direction,
        }, { preserveState: true });
    };

    const handleAddPeripheral = () => router.visit('/admin/peripherals/create');
    const handleEdit = (id) => router.visit(`/admin/peripherals/edit/${id}`);
   const handleDelete = (id) => {
  ConfirmDelete('This peripheral will be permanently removed.').then((result) => {
    if (result.isConfirmed) {
      router.delete(`/admin/peripherals/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          AlertSuccess('Peripheral deleted successfully');
        },
        onError: () => {
          // Optionally show error modal
        },
      });
    }
  });
};


    const [selectedQR, setSelectedQR] = useState(null);
    const [copied, setCopied] = useState(false);

    return (
        <AdminLayout>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold">Peripherals</h1>
                <button
                    onClick={handleAddPeripheral}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                >
                    + Add Peripheral
                </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
                <input
                    type="text"
                    placeholder="Search code, type, or serial..."
                    className="px-4 py-2 border rounded-md w-full sm:max-w-xs shadow-sm"
                    value={filters.search || ''}
                    onChange={handleSearchChange}
                />

                <select
                    className="px-4 py-2 border rounded-md shadow-sm"
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

                <select
                    className="px-7 py-2 border rounded-md shadow-sm"
                    value={filters.type || ''}
                    onChange={handleTypeFilter}
                >
                    <option value="">All Types</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Keyboard">Keyboard</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('id')}>ID</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('peripherals_code')}>Peripheral Code</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('serial_number')}>Serial Number</th>
                            <th className="px-4 py-3 border cursor-pointer" onClick={() => handleSort('condition')}>Condition</th>
                            <th className="px-4 py-3 border">Room Name</th>
                            <th className="px-4 py-3 border">Unit Code</th>
                            <th className="px-4 py-3 border">QR Code</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peripherals.data.length > 0 ? (
                            peripherals.data.map(peripheral => (
                                <tr key={peripheral.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 border">{peripheral.id}</td>
                                    <td className="px-4 py-2 border font-mono text-blue-700">{peripheral.peripherals_code}</td>
                                    <td className="px-4 py-2 border">{peripheral.type}</td>
                                    <td className="px-4 py-2 border">{peripheral.serial_number}</td>
                                    <td className="px-4 py-2 border">{peripheral.condition}</td>
                                    <td className="px-4 py-2 border">
                                        {peripheral.room?.room_name || (
                                            <span className="text-gray-400 italic">No Room</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {peripheral.unit?.unit_code || (
                                            <span className="text-gray-400 italic">No Unit</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {peripheral.qr_code_path ? (
                                            <img
                                        src={`/storage/${peripheral.qr_code_path}`}
                                        alt="QR Code"
                                        className="w-12 h-12 object-contain cursor-pointer"
                                        onClick={() =>
                                            setSelectedQR({
                                                image: `/storage/${peripheral.qr_code_path}`,
                                                peripheral_type: peripheral.type,
                                                peripheral_code: peripheral.peripherals_code,
                                            })
                                        }

                                        />
                                        ) : (
                                            <span className="text-gray-400 italic">No QR</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center whitespace-nowrap space-x-4">
                                    <button
                                        onClick={() => handleEdit(peripheral.id)}
                                        className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(peripheral.id)}
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
                                <td colSpan="9" className="px-4 py-4 text-center text-gray-500 italic">
                                    No matching peripherals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex gap-2 flex-wrap text-sm">
                {peripherals.links.map((link, i) => (
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
                Showing {peripherals.from} to {peripherals.to} of {peripherals.total} peripherals
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
                        <p><span className="font-semibold">Peripheral Type:</span> {selectedQR.peripheral_type}</p>
                        <p><span className="font-semibold">Peripheral Code:</span> {selectedQR.peripheral_code}</p>
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
