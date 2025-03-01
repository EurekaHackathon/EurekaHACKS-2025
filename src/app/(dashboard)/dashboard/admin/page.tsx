import { Suspense } from "react";
import AdminStats from "@/components/AdminStats";
import AdminStatsSkeleton from "@/components/AdminStatsSkeleton";

export default async function AdminOverview() {
    return (
        <Suspense fallback={<AdminStatsSkeleton/>}>
            <AdminStats/>
        </Suspense>
    );
}