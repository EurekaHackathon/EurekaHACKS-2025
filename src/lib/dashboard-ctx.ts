"use client";

import { createContext, useContext } from "react";
import { authorizeSession } from "./sessions";
import { getApplicationStatus, getRsvpStatus } from "@/lib/sqlc/application_sql";

export type DashboardCtxType = {
    user: Awaited<ReturnType<typeof authorizeSession>> | null,
    applicationStatus: Awaited<ReturnType<typeof getApplicationStatus>> | null,
    rsvpStatus: Awaited<ReturnType<typeof getRsvpStatus>> | null
}

export const DashboardCtx = createContext<DashboardCtxType>({
    user: null,
    applicationStatus: null,
    rsvpStatus: null
});

export const useDashboardCtx = () => useContext(DashboardCtx);