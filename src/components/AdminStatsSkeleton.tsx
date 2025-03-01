import { cn } from "@/lib/utils";
import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import React from "react";
import AdminDashboardStat from "@/components/AdminDashboardStat";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        />
    );
}

export default function AdminStatsSkeleton() {
    return (
        <div className="grid grid-cols-3 gap-4 mt-12">
            {[1, 2, 3, 4, 5, 6].map(_ => {
                return (
                    <div className="border border-secondary-200 rounded-xl px-6 py-8 bg-secondary-50 bg-opacity-50">
                        <Skeleton className="h-6 w-24"/>
                        <Skeleton className="h-8 w-10 mt-4"/>
                    </div>
                );
            })}
        </div>
    );
}