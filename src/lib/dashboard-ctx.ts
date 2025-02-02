"use client";

import { createContext, useContext } from 'react';
import { authorizeSession } from "./sessions";

export type DashboardCtxType = {
    user: Awaited<ReturnType<typeof authorizeSession>> | null
}

export const DashboardCtx = createContext<DashboardCtxType>({
    user: null
});

export const useDashboardCtx = () => useContext(DashboardCtx);