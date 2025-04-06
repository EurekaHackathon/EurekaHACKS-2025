"use client";

import { Suspense } from "react";
import Application from "@/components/Application";
import ApplicationSkeleton from "@/components/ApplicationSkeleton";
import SubmittedApplication from "@/components/SubmittedApplication";
import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { Icon } from "@iconify/react";

export default function ApplicationPage() {
    const {applicationStatus} = useDashboardCtx();

    return (
        <>
            {/*{applicationStatus?.status &&*/}
            {/*    <SubmittedApplication/>*/}
            {/*}*/}
            {/*{(applicationStatus === null || applicationStatus.status === "unsubmitted") &&*/}
            {/*    <Suspense fallback={<ApplicationSkeleton/>}>*/}
            {/*      <Application/>*/}
            {/*    </Suspense>*/}
            {/*}*/}
            <div className="flex flex-col justify-center items-center h-screen text-gray-700 px-12 lg:px-20">
                <div className="min-h-24">
                    <Icon className="text-6xl text-error-500 mb-8" icon="fluent:dismiss-circle-28-regular"/>
                </div>
                <h1 className="text-5xl font-semibold">Applications closed</h1>
                <p className="text-lg mt-4">EurekaHACKS 2025 has concluded. Stay tuned for EurekaHACKS 2026!</p>
            </div>
        </>
    );
}