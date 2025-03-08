"use client";

import { Suspense } from "react";
import Application from "@/components/Application";
import ApplicationSkeleton from "@/components/ApplicationSkeleton";
import SubmittedApplication from "@/components/SubmittedApplication";
import { useDashboardCtx } from "@/lib/dashboard-ctx";

export default function ApplicationPage() {
    const { applicationStatus } = useDashboardCtx();

    return (
        <>
            {applicationStatus?.status &&
                <SubmittedApplication/>
            }
            {(applicationStatus === null || applicationStatus.status === "unsubmitted") &&
                <Suspense fallback={<ApplicationSkeleton/>}>
                  <Application/>
                </Suspense>
            }
        </>
    );
}