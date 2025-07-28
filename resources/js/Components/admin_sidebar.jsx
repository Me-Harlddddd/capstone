import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    BuildingOffice2Icon,
    CpuChipIcon,
    PuzzlePieceIcon,
    Squares2X2Icon,
    UserGroupIcon,
    ChartBarIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
    const { url } = usePage();

    return (
        <div className="w-64 h-screen bg-white text-gray-700 border-r border-gray-200 p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-10 tracking-tight">
                Inventory System
            </h2>
            <ul className="space-y-2">
                <li>
                    <Link href="/dashboard" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/dashboard' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <HomeIcon className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/admin/rooms" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/admin/rooms' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <BuildingOffice2Icon className="w-5 h-5 mr-3" />
                        Rooms
                    </Link>
                </li>
                <li>
                    <Link href="/admin/units" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/admin/units' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <ComputerDesktopIcon className="w-5 h-5 mr-3" />
                        Units
                    </Link>
                </li>
                <li>
                    <Link href="/admin/peripherals" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/admin/peripherals' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <PuzzlePieceIcon className="w-5 h-5 mr-3" />
                        Peripherals
                    </Link>
                </li>
                <li>
                    <Link href="/admin/Room-Equipments" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/admin/Room-Equipments' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <Squares2X2Icon className="w-5 h-5 mr-3" />
                        Room Equipments
                    </Link>
                </li>
                <li>
                    <Link href="/faculty" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/faculty' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <UserGroupIcon className="w-5 h-5 mr-3" />
                        Faculty
                    </Link>
                </li>
                <li>
                    <Link href="/reporting" className={`flex items-center px-4 py-2 rounded-md transition 
                        ${url === '/reporting' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
                        <ChartBarIcon className="w-5 h-5 mr-3" />
                        Reporting
                    </Link>
                </li>
            </ul>
        </div>
    );
}
