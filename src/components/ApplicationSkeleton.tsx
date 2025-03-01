import { cn } from "@/lib/utils";
import { Input } from "@/components/Input";
import { SchoolSelect } from "@/components/SchoolSelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { CitySelect } from "@/components/CitySelect";
import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import React from "react";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        />
    );
}

export default function ApplicationSkeleton() {
    let state = {
        payload: new Map<string, string>()
    };
    return (
        <div className="self-center flex flex-col items-stretch py-[10vh] px-8 xl:px-16">
            <Skeleton className="h-12 w-full md:w-96"/>
            <Skeleton className="h-8 mt-10 md:w-96"/>
            <div className="grid gap-4 mt-6 mb-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full">
                        <Skeleton className="h-5 w-32"/>
                        <Skeleton className="h-10 mt-2"/>
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-5 w-32"/>
                        <Skeleton className="h-10 mt-2"/>
                    </div>
                </div>
                <div className="mt-4">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-1.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-1.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-2">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-1.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-1.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <Skeleton className="h-6 w-72 mt-10"/>
                <Skeleton className="h-3 w-40"/>
                {/*/!*Short answer question*!/*/}
                {/*<div>*/}
                {/*    <label className="block text-lg font-medium">*/}
                {/*        Eureka is defined as “a cry of joy or satisfaction when one finds or discovers something”. Tell*/}
                {/*        us about one of your “eureka” moments. <span className="text-error-600">*</span>*/}
                {/*    </label>*/}
                {/*    <h3 className="font-medium text-gray-500">Max 900 characters</h3>*/}
                {/*    <CharacterLimiter defaultValue={state.payload?.get("short-answer")} maxChars={900}*/}
                {/*                      label="Short answer" name="short-answer"/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <h2 className="text-3xl font-semibold mt-8">Dietary Restrictions</h2>*/}
                {/*    <h3 className="font-medium text-gray-500">Select all that apply</h3>*/}
                {/*</div>*/}

                <div className="border rounded-md border-gray-300 py-4 px-6 grid gap-2">
                    {[...dietaryRestrictionsList].map(_ => {
                        return (
                            <div className="flex gap-2 mt-1">
                                <Skeleton className="h-5 w-5"/>
                                <Skeleton className="h-4 w-32"/>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Skeleton className="h-8 w-40"/>
                    <Skeleton className="h-5 w-32 mt-2"/>
                </div>

                <div className="mt-2.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-2.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-2.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>
                <div className="mt-2.5">
                    <Skeleton className="h-5 w-32"/>
                    <Skeleton className="h-10 mt-2"/>
                </div>

                <Skeleton className="h-8 mt-10 w-80 md:w-96"/>
                <Skeleton className="h-8 w-64"/>

                <div className="flex flex-col lg:flex-row gap-4 mt-8">
                    <div className="w-full">
                        <Skeleton className="h-5 w-32"/>
                        <Skeleton className="h-10 mt-2"/>
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-5 w-32"/>
                        <Skeleton className="h-10 mt-2"/>
                    </div>
                </div>

                <Skeleton className="h-10 mt-8 w-20"/>
            </div>
        </div>
    );
}