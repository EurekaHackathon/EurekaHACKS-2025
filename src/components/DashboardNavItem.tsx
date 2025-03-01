"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
    icon: string;
    text: string;
    route: string;
}

export default function DashboardNavItem({ icon, text, route }: props) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/dashboard/admin");

    const isActive = route === pathname || (route === "/dashboard/admin" && isAdminRoute);

    return (
        <Link href={route} className={`flex gap-2 hover:bg-gray-600 hover:bg-opacity-10 duration-75 py-2 px-4 rounded-lg
                      ${isActive ? "bg-gray-600 bg-opacity-10" : ""}
                      ${isActive ? "text-secondary-500" : "text-gray-500"}`}>
            <div className="min-w-6">
                <Icon icon={icon} className="text-2xl"/>
            </div>
            <span className="font-semibold">{text}</span>
        </Link>
    );
}