import { DashboardNav } from "@/components/DashboardNav";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex">
            <div className="w-[12%]">
                <DashboardNav />
            </div>
            <div className="w-[88%] py-32 px-48">
                {children}
            </div>
        </div>
    );
}
