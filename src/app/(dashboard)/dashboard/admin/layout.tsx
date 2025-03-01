import AdminDashboardTabs from "@/components/AdminDashboardTabs";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);
    if (!user) {
        redirect("/login");
    }
    if (!user.isAdmin) {
        redirect("/dashboard");
    }

    return (
        <div className="flex flex-col items-stretch py-[10vh] px-8 xl:px-16">
            <h1 className="text-5xl font-bold text-gray-700">
                Admin Dashboard
            </h1>
            <div className="mt-8">
                <AdminDashboardTabs/>
            </div>
            {children}
        </div>
    );
}