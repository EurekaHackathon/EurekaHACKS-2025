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
        <DashboardProvider value={{ user }}>
            <div className="min-h-screen flex">
                <DashboardNav/>
                <div className="w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                    {children}
                </div>
            </div>
        </DashboardProvider>
    );
}
