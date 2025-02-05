"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import DashboardNavItem from "@/components/DashboardNavItem";
import Link from "next/link";
import { SignOutForm } from "@/components/SignOutForm";
import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export function DashboardNav() {
    const { user } = useDashboardCtx();
    const [open, setOpen] = useState(false)

    if (!user) {
        redirect("/login");
    }

    let initials = user.firstName?.slice(0, 1) ?? "" + user.lastName?.slice(0, 1) ?? "";
    if (initials.length === 0) {
        initials = "H";
    }

    const fullName = (user.firstName) ? user.firstName + " " + user.lastName : "Hacker";

    
    // Close navbar when you navigate to a new page
    const path = usePathname();
    useEffect(() => {
        setOpen(false)
    }, [path]);

    return (
        <>
            <nav className="lg:hidden fixed flex items-center bg-gray-50 text-gray-700 py-2 px-4 w-screen border-b">
                <button onClick={() => setOpen(!open)}>
                    <Icon icon="fluent:navigation-16-filled" className={cn(
                        "text-3xl md:text-4xl",
                        open && "translate-x-[-100%]",
                    )} />
                </button>
            </nav>
            <div className={cn(
                "top-0 fixed lg:sticky w-full lg:w-[25%] xl:w-[18%] z-10 bg-[#f3f2f7] h-screen flex justify-between flex-col border-r border-gray-600 border-opacity-20 transition",
                !open && "translate-x-[-100%] lg:translate-x-0"
            )}>
                <div className="text-gray-600 px-8 pt-10 flex justify-between lg:justify-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image className="w-12 md:w-16 lg:w-10 h-auto" src={logo} alt="EurekaHACKS Logo" />
                        <div className="text-gray-600 text-2xl md:text-3xl lg:text-xl font-bold pr-10">
                            <span>EurekaHACKS</span>
                        </div>
                    </Link>

                    <button onClick={() => setOpen(!open)} className="z-10 lg:hidden">
                        <Icon icon="fluent:dismiss-12-regular" className="text-2xl md:text-4xl" />
                    </button>
                </div>
                <div className="flex flex-col px-8 gap-2">
                    <DashboardNavItem icon="fluent:home-16-filled" text="Home" route="/dashboard" />
                    <DashboardNavItem icon="fluent:form-multiple-48-filled" text="Application"
                        route="/dashboard/application" />
                    <DashboardNavItem icon="fluent:calendar-32-filled" text="Schedule"
                        route="/dashboard/schedule" />
                    {user.isAdmin &&
                        <DashboardNavItem icon="fluent:people-16-filled" text="Admin" route="/dashboard/admin" />}
                    <DashboardNavItem icon="fluent:settings-48-filled" text="Settings"
                        route="/dashboard/settings" />
                </div>
                <div className="pb-12">
                    <div className="flex items-center text-gray-600 gap-3 justify-center pt-32">
                        <div
                            className="flex items-center justify-center h-10 w-10 bg-gray-50 rounded-full border-gray-300 border">
                            <h1 className="font-bold text-gray-600">
                                {initials}
                            </h1>
                        </div>
                        <h1 className="font-semibold pr-10">
                            {fullName.trim()}
                        </h1>
                    </div>
                    <div className="pt-4 flex justify-center">
                        <SignOutForm />
                    </div>
                </div>
            </div>
        </>
    );
}