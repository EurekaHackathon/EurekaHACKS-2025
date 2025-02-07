"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DeadlineCountdown } from "@/components/DeadlineCountdown";
import { useDashboardCtx } from "@/lib/dashboard-ctx";

export default function Dashboard() {
    const { user } = useDashboardCtx();
    const firstName = user?.firstName ? user?.firstName : "Hacker";

    return (
        <div className="self-center flex flex-col items-stretch py-[10vh]">
            <h1 className="text-5xl font-bold text-gray-700">
                Welcome,&nbsp;
                <span className="text-secondary-600">{firstName}</span>
            </h1>
            <div className="border border-gray-300 mt-12 rounded-lg bg-gray-50 py-8 px-12">
                <div className="flex justify-between">
                    <h2 className="text-gray-600 font-semibold text-2xl">Application status</h2>
                    <Icon icon="fluent:form-multiple-48-filled" className="text-gray-500 text-4xl" />
                </div>
                <h1 className="text-secondary-600 font-bold text-5xl pt-6">Not started</h1>
                <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                    You haven't started your application yet. Click the button below to start your application.
                </p>
                <Link href="/dashboard/application"
                    className="bg-secondary-600 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                    Start application
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-500 font-semibold text-2xl">Time until application deadline</h2>
                        <Icon icon="fluent:clock-12-filled" className="text-gray-500 text-4xl" />
                    </div>
                    <DeadlineCountdown />
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        Application due on March 23, 2025 at 11:59 PM EST.
                    </p>
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-500 font-semibold text-2xl">Time until Hackathon</h2>
                        <Icon icon="fluent:hourglass-half-16-regular" className="text-gray-500 text-4xl" />
                    </div>
                    <CountdownTimer />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-600 font-semibold text-2xl">Discord server</h2>
                        <Icon icon="ic:baseline-discord" className="text-gray-500 text-4xl" />
                    </div>
                    <h1 className="text-secondary-600 font-bold text-5xl pt-6">Our Discord server</h1>
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        Join our Discord to connect with hackers and receive important announcements.
                    </p>
                    <a href="https://discord.gg/ApEmE7g7GB" target="_blank" rel="noopener noreferrer"
                        className="bg-secondary-600 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                        Join Discord
                    </a>
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-600 font-semibold text-2xl">Hacker package</h2>
                        <Icon icon="fluent:book-information-20-filled" className="text-gray-500 text-4xl" />
                    </div>
                    <h1 className="text-secondary-600 font-bold text-5xl pt-6">View hacker package</h1>
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        View the hacker package, complete with event info and schedules for EurekaHACKS 2025.
                    </p>
                    <Link href="/dashboard" aria-disabled="true" tabIndex={-1}
                        className="pointer-events-none bg-secondary-300 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                        Coming soon
                    </Link>
                </div>
            </div>
        </div>
    );
}