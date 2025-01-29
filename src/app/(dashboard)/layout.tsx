import { DashboardNav } from "@/components/DashboardNav";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex">
            <div className="w-[12%] h-screen sticky top-0">
                <DashboardNav/>
            </div>
            <div className="w-[88%] overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
