import AdminDashboardTab from "@/components/AdminDashboardTab";

export default function AdminDashboardTabs() {
    return (
        <div className="flex gap-1 md:gap-4 text-gray-600 font-semibold">
            <AdminDashboardTab text="Overview" path="/dashboard/admin"/>
            <AdminDashboardTab text="Applications" path="/dashboard/admin/applications"/>
            <AdminDashboardTab text="Scan QR Code" path="/dashboard/admin/scan"/>
        </div>
    );
}