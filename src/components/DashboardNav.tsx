"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import DashboardNavItem from "@/components/DashboardNavItem";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { SignOutForm } from "./SignOutForm";
import { useState } from "react";

export function DashboardNav() {
    const { user } = useDashboardCtx();
    const [isCollapsed, setIsCollapsed] = useState(false);

    let initials = user?.firstName?.slice(0, 1) ?? "" + user?.lastName?.slice(0, 1) ?? "";
    if (initials.length === 0) {
        initials = "H";
    }

    const fullName = (user?.firstName) ? user?.firstName + " " + user?.lastName : "Hacker";

    return (
        <nav className={`bg-[#f3f2f7] min-h-screen flex flex-col justify-between border-r border-gray-200 transition-all duration-300 overflow-hidden ${
            isCollapsed ? "w-16" : "w-64"
        } fixed left-0 top-0 z-50`}>
            <div className="flex flex-col">
                <div className="flex justify-between items-center px-4 py-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-3 min-w-0">
                        <Image 
                            className="w-8 h-auto flex-shrink-0" 
                            src={logo} 
                            alt="EurekaHACKS Logo"
                        />
                        <span className={`text-gray-700 font-bold text-lg transition-opacity duration-300 ${
                            isCollapsed ? "opacity-0 w-0" : "opacity-100"
                        }`}>
                            EurekaHACKS
                        </span>
                    </Link>
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="z-10 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <Icon 
                            icon={isCollapsed ? "fluent:chevron-right-12-filled" : "fluent:chevron-left-12-filled"} 
                            className="text-xl text-gray-600"
                        />
                    </button>
                </div>

                <div className="flex flex-col px-3 py-6 space-y-2">
                    <DashboardNavItem 
                        icon="fluent:home-16-filled" 
                        text="Home" 
                        route="/dashboard"
                        isCollapsed={isCollapsed}
                    />
                    <DashboardNavItem 
                        icon="fluent:form-multiple-48-filled" 
                        text="Application"
                        route="/dashboard/application"
                        isCollapsed={isCollapsed}
                    />
                    <DashboardNavItem 
                        icon="fluent:calendar-32-filled" 
                        text="Schedule"
                        route="/dashboard/schedule"
                        isCollapsed={isCollapsed}
                    />
                    {user?.isAdmin && (
                        <DashboardNavItem 
                            icon="fluent:people-16-filled" 
                            text="Admin" 
                            route="/dashboard/admin"
                            isCollapsed={isCollapsed}
                        />
                    )}
                    <DashboardNavItem 
                        icon="fluent:settings-48-filled" 
                        text="Settings"
                        route="/dashboard/settings"
                        isCollapsed={isCollapsed}
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-full border border-gray-300 flex items-center justify-center">
                        <span className="font-bold text-gray-600">{initials}</span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-grow min-w-0">
                            <p className="font-semibold text-gray-700 truncate">
                                {fullName.trim()}
                            </p>
                        </div>
                    )}
                </div>
                <SignOutForm collapsed={isCollapsed} />
            </div>
        </nav>
    );
}
