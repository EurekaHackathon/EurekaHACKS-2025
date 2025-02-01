"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import DashboardNavItem from "@/components/DashboardNavItem";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { SignOutForm } from "./SignOutForm";

export function DashboardNav() {
    const { user } = useDashboardCtx();

    return (
        <div className="bg-[#f3f2f7] h-screen flex justify-between flex-col border-r border-gray-600 border-opacity-20">
            <div className="flex justify-between items-center gap-2 px-6 pt-10">
                <Link href="/" className="gap-2 flex items-center">
                    <Image className="w-12 h-auto" src={logo} alt="EurekaHACKS Logo"/>
                    <p className="text-gray-600 font-bold text-xl">EurekaHACKS</p>
                </Link>
                <button className="p-2 bg-gray-600 bg-opacity-10 rounded-md">
                    <Icon icon="fluent:chevron-left-12-filled" className="text-2xl"></Icon>
                </button>
            </div>
            <div className="flex flex-col px-8 gap-2">
                <DashboardNavItem icon="fluent:home-16-filled" text="Home" route="/dashboard"/>
                <DashboardNavItem icon="fluent:form-multiple-48-filled" text="Application"
                                  route="/dashboard/application"/>
                <DashboardNavItem icon="fluent:calendar-32-filled" text="Schedule"
                                  route="/dashboard/schedule"/>
                {user?.isAdmin && <DashboardNavItem icon="fluent:people-16-filled" text="Admin" route="/dashboard/admin"/>}
            </div>
            <div className="pb-12">
                <div className="flex items-center text-gray-600 gap-3 justify-center pt-32">
                    <div
                        className="flex items-center justify-center h-10 w-10 bg-gray-50 rounded-full border-gray-300 border">
                        <h1 className="font-bold text-gray-600">{user?.firstName?.slice(0, 1) ?? ""}{user?.lastName?.slice(0, 1) ?? ""}</h1>
                    </div>
                    <h1 className="font-semibold pr-10">
                        {(user?.firstName && user?.lastName) ? user?.firstName + " " + user?.lastName : "Hacker"}
                    </h1>
                </div>
                <div className="pt-4 flex justify-center">
                    <SignOutForm/>
                </div>
            </div>
        </div>
    );
}