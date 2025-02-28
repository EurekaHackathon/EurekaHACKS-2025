import DashboardSkeleton from "@/components/DashboardSkeleton";
import { Suspense } from "react";
import DashboardHome from "@/components/ui/DashboardHome";

export default async function Dashboard() {
    return (
        <Suspense fallback={<DashboardSkeleton/>}>
            <DashboardHome/>
        </Suspense>
    );
}