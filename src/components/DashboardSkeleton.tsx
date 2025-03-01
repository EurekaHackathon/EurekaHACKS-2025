import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        />
    );
}

export default function DashboardSkeleton() {
    return (
        <div className="self-center flex flex-col items-stretch py-[10vh] px-8 xl:px-16">
            <Skeleton className="h-12 w-full md:w-96"/>
            <div className="border border-gray-300 mt-12 rounded-lg bg-gray-50 py-8 px-12">
                <Skeleton className="h-6 w-full sm:w-64"/>
                <Skeleton className="h-10 mt-12 w-full md:w-96"/>
                <Skeleton className="h-4 mt-2 w-full md:w-96"/>
                <Skeleton className="h-12 mt-4 w-full md:w-96"/>
            </div>
            <div className="flex 2xl:flex-row flex-col gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <Skeleton className="h-6 w-full sm:w-64"/>
                    <Skeleton className="h-10 mt-12 w-full md:w-96"/>
                    <Skeleton className="h-4 mt-2 mb-10 w-full md:w-96"/>
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <Skeleton className="h-6 w-full sm:w-64"/>
                    <Skeleton className="h-14 mt-12 w-full md:w-96"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <Skeleton className="h-6 w-full sm:w-64"/>
                    <Skeleton className="h-10 mt-12 w-full md:w-96"/>
                    <Skeleton className="h-4 mt-2 w-full md:w-96"/>
                    <Skeleton className="h-4 mt-2 mb-10 w-full md:w-96"/>
                    <Skeleton className="h-10 mt-8 w-full md:w-96"/>
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <Skeleton className="h-6 w-full sm:w-64"/>
                    <Skeleton className="h-14 mt-12 w-full md:w-96"/>
                    <Skeleton className="h-4 mt-2 w-full md:w-96"/>
                    <Skeleton className="h-4 mt-2 mb-10 w-full md:w-96"/>
                    <Skeleton className="h-10 mt-8 w-full md:w-96"/>
                </div>
            </div>
        </div>
    );
}