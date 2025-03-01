import { Suspense } from "react";
import Application from "@/components/Application";
import ApplicationSkeleton from "@/components/ApplicationSkeleton";

export default async function ApplicationPage() {

    return (
        <>
            <Suspense fallback={<ApplicationSkeleton/>}>
                <Application/>
            </Suspense>
        </>
    )
        ;
}
