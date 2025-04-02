import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        />
    );
}

export default function ApplicationTableSkeleton() {
    return (
        <div className="overflow-x-auto grid">
            <Skeleton className="w-24 text-start h-8"/>
            <Skeleton className="text-start h-10 mt-2 mb-3"/>
            <Skeleton className="text-start w-40 h-6 mt-2 mb-10"/>
            <table className="w-full border">
                <thead>
                <tr className="text-sm 2xl:text-base text-gray-500 hover:bg-gray-100 duration-75">
                    <th className="text-start border-b py-4 pl-4 mr-12">First Name</th>
                    <th className="text-start border-b mr-12">Last Name</th>
                    <th className="text-start border-b mr-12">School</th>
                    <th className="text-start border-b mr-12">Status</th>
                    <th className="text-start text-nowrap border-b mr-12">Date submitted</th>
                    <th className="text-start border-b mr-12"></th>
                </tr>
                </thead>
                <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
                    <tr className="hover:bg-gray-100 duration-75 h-[4.56rem] 2xl:h-[4.81rem]"
                        key={num}>
                        <td className="border-b pl-4 pr-4">
                            <div className="w-24">
                                <Skeleton className="text-start h-6"/>
                            </div>
                        </td>
                        <td className="border-b pr-4">
                            <div className="w-24">
                                <Skeleton className="text-start h-6"/>
                            </div>
                        </td>
                        <td className="border-b pr-4">
                            <Skeleton className="text-start h-6 w-96"/>
                        </td>
                        <td className="border-b pr-4">
                            <Skeleton className="text-start h-6 w-32"/>
                        </td>
                        <td className="border-b">
                            <div className="w-32">
                                <Skeleton className="text-start h-6 w-28"/>
                            </div>
                        </td>
                        <td className="border-b pr-4">
                            <div className="w-16">
                                <Skeleton className="text-start h-8 w-14"/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4 flex w-full justify-between">
                <Skeleton className="w-64 h-6"/>
                <Skeleton className="w-52 h-8"/>
            </div>
        </div>
    );
}