"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardTab({ path, text }: { path: string, text: string }) {
    return (
        <Link href={path}
              className={`w-40 text-xs md:text-base text-center duration-75 bg-opacity-10 hover:bg-opacity-10 hover:bg-gray-600 
              ${usePathname() === path ? "bg-gray-600 text-secondary-500" : ""} md:px-4 py-1 rounded-lg`}>
            {text}
        </Link>
    );
}