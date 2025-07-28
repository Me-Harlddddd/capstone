import Sidebar from '@/Components/admin_sidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );
}
