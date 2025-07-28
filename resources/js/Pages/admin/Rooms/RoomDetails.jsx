import React, { useState } from "react";
import {
  ComputerDesktopIcon,
  CpuChipIcon,
  DeviceTabletIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function RoomDetails({ room, units, peripherals, equipments }) {
  const [activeTab, setActiveTab] = useState("units");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const perPage = 5;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setSidebarOpen(false);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = (data) => {
    let result = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortField) {
      result.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return sortDirection === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  };

  const renderTable = (data) => {
    if (!data.length) return null;

    const displayKeys = Object.keys(data[0]).filter(
      (key) => key !== "created_at" && key !== "updated_at"
    );

    const paginated = data.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    const totalPages = Math.ceil(data.length / perPage);

    return (
      <div className="space-y-4">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {displayKeys.map((key, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border-b text-left font-semibold capitalize text-xs cursor-pointer whitespace-nowrap"
                    onClick={() => handleSort(key)}
                  >
                    {key.replace(/_/g, " ")}
                    {sortField === key && (
                      <span className="ml-1 text-gray-400">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
                <th className="px-4 py-3 border-b text-left font-semibold text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item, idx) => (
                <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
                  {displayKeys.map((key, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 border-b whitespace-nowrap text-gray-700"
                    >
                      {key === "qr_code_path" && item[key] ? (
                        <img
                          src={`/storage/${item[key]}`}
                          alt="QR Code"
                          className="w-14 h-14 object-contain"
                        />
                      ) : typeof item[key] === "object" && item[key] !== null ? (
                        item[key].room_name ?? "-"
                      ) : (
                        item[key] ?? "-"
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b">
                    <Link
                      href={`/admin/${activeTab}/${item.id}/edit`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    let data = [];
    let label = "";

    switch (activeTab) {
      case "units":
        data = units;
        label = "Unit";
        break;
      case "peripherals":
        data = peripherals;
        label = "Peripheral";
        break;
      case "equipments":
        data = equipments;
        label = "Equipment";
        break;
      default:
        break;
    }

    const filtered = filteredData(data);

    return (
      <div className="space-y-4">
        {/* Search */}
        <div className="flex items-center w-full max-w-md border rounded px-3 py-2 bg-white shadow-sm">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder={`Search ${label}s...`}
            className="ml-2 outline-none w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {filtered.length ? (
          renderTable(filtered)
        ) : (
          <p className="text-gray-500 italic">No {label.toLowerCase()}s found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white border-b px-4 py-3 shadow">
        <span className="font-semibold text-lg">Room: {room.room_name}</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed z-30 md:static top-14 md:top-0 left-0 h-full md:h-auto w-full md:w-64 bg-white border-r shadow transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="hidden md:block p-4 bg-gray-200 font-semibold border-b">
          Room: {room.room_name}
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => handleTabChange("units")}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 w-full ${
              activeTab === "units" ? "bg-gray-200 font-medium" : ""
            }`}
          >
            <ComputerDesktopIcon className="h-5 w-5" />
            Units
          </button>
          <button
            onClick={() => handleTabChange("peripherals")}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 w-full ${
              activeTab === "peripherals" ? "bg-gray-200 font-medium" : ""
            }`}
          >
            <DeviceTabletIcon className="h-5 w-5" />
            Peripherals
          </button>
          <button
            onClick={() => handleTabChange("equipments")}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 w-full ${
              activeTab === "equipments" ? "bg-gray-200 font-medium" : ""
            }`}
          >
            <CpuChipIcon className="h-5 w-5" />
            Equipments
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-14 md:mt-0 overflow-auto">{renderSection()}</main>
    </div>
  );
}
