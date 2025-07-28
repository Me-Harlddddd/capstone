import React, { useState, useMemo, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import AlertSuccess from '@/Components/AlertSuccess';


export default function CreatePeripherals() {
  const { rooms, units, flash } = usePage().props;
  const [showSuccess, setShowSuccess] = useState(!!flash.success);

  const { data, setData, post, processing, errors, reset} = useForm({
    peripherals_code: '',
    unit_id: '',
    room_id: '',
    brand: '',
    model: '',
    type: 'Mouse',
    serial_number: '',
    condition: '',
  });

  // Filtered units by selected room_id
  const filteredUnits = useMemo(() => {
    if (!data.room_id) return [];
    return units.filter((unit) => unit.room_id === parseInt(data.room_id));
  }, [data.room_id, units]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.peripherals.store'), {
        onSuccess: () =>{
               AlertSuccess('Peripherals added successfully');
            reset();
        }
    });
  };


  useEffect(() => {
          if (flash.success) {
              setShowSuccess(true);
          }
      }, [flash]);
    

      

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Peripheral</h2>

       

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Mouse">Mouse</option>
              <option value="Keyboard">Keyboard</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Peripheral Code</label>
            <input
              type="text"
              value={data.peripherals_code}
              onChange={(e) => setData('peripherals_code', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
            {errors.peripherals_code && <p className="text-red-500 text-sm">{errors.peripherals_code}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              value={data.brand}
              onChange={(e) => setData('brand', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              value={data.model}
              onChange={(e) => setData('model', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              value={data.serial_number}
              onChange={(e) => setData('serial_number', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.serial_number && <p className="text-red-500 text-sm">{errors.serial_number}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <input
              type="text"
              value={data.condition}
              onChange={(e) => setData('condition', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.condition && <p className="text-red-500 text-sm">{errors.condition}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Room</label>
            <select
              value={data.room_id}
              onChange={(e) => {
                setData('room_id', e.target.value);
                setData('unit_id', ''); // Reset unit selection
              }}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_name}
                </option>
              ))}
            </select>
            {errors.room_id && <p className="text-red-500 text-sm">{errors.room_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              value={data.unit_id}
              onChange={(e) => setData('unit_id', e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Unit</option>
              {filteredUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_code}
                </option>
              ))}
            </select>
            {errors.unit_id && <p className="text-red-500 text-sm">{errors.unit_id}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Save Peripheral
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
