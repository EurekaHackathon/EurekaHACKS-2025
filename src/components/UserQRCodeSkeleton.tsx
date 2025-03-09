import React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export default function UserQRCodeSkeleton() {
    return (
        <div className="flex p-12 justify-center items-center min-h-screen">
            <div
                className="flex flex-col items-center bg-gray-50 border border-gray-300 p-8 md:p-10 lg:p-12 rounded-xl">
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-secondary-600 font-bold">QR Code</h1>
                    <p className="md:text-lg text-gray-500 mt-1">Use this QR code to check in and receive food.</p>
                </div>
                <div
                    className="mt-4 w-[380px] h-[380px] md:mt-6 lg:mt-8 p-6 md:p-8 lg:p-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <svg className="text-secondary-700 animate-spin" xmlns="http://www.w3.org/2000/svg" width="150"
                         height="150" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                              opacity="0.5"/>
                        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                        </path>
                    </svg>
                </div>
                <div className="flex flex-row w-full justify-end mt-4 md:mt-6 gap-4">
                    <Skeleton
                        className="bg-secondary-300 text-white min-h-9 min-w-9 px-2 py-2 rounded-md">
                    </Skeleton>
                    <Skeleton
                        className="bg-secondary-300 text-white min-h-9 min-w-9 px-2 py-2 rounded-md">
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}