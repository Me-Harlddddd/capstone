import AdminLayout from '@/Layouts/AdminLayout'; // we'll create this layout next

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p>Welcome, Admin! Here's your overview.</p>
            </div>
        </AdminLayout>
    );
}
