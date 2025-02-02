import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { DashboardProvider } from "@/components/DashboardProvider";
import { DashboardNav } from "@/components/DashboardNav";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);

    return (
        <DashboardProvider value={{user}}>
            <div className="min-h-screen flex">
                <div className="w-[12%] h-screen sticky top-0">
                    <DashboardNav />
                </div>
                <div className="w-[88%] overflow-y-auto">
                    {children}
                </div>
            </div>
        </DashboardProvider>
    );
}
