"use client";

import { createContext, useContext } from "react";
import { authorizeSession } from "./sessions";
import { getApplicationStatus } from "@/lib/sqlc/application_sql";

export type DashboardCtxType = {
    user: Awaited<ReturnType<typeof authorizeSession>> | null,
    applicationStatus: Awaited<ReturnType<typeof getApplicationStatus>> | null
}

export const DashboardCtx = createContext<DashboardCtxType>({
    user: null,
    applicationStatus: null
});

export const useDashboardCtx = () => useContext(DashboardCtx);