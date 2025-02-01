"use client";

import { DashboardCtx, DashboardCtxType } from "@/lib/dashboard-ctx";
import React from "react";

interface props {
    value: DashboardCtxType,
    children: React.ReactNode
}

export function DashboardProvider({ value, children }: props) {
    return (
        <DashboardCtx.Provider value={value}>
            {children}
        </DashboardCtx.Provider>
    );
}