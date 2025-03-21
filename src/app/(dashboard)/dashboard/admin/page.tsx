import { Suspense } from "react";
import AdminStats from "@/components/AdminStats";
import AdminStatsSkeleton from "@/components/AdminStatsSkeleton";
import AdminGraphs from "@/components/AdminGraphs";

export default async function AdminOverview() {
    return (
        <Suspense fallback={<AdminStatsSkeleton/>}>
            <AdminStats/>
            <AdminGraphs/>
        </Suspense>
    );
}