import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import QrCodePlaceholder from "../../public/qrcode-placeholder.png";

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
                <Image
                    className="mt-4 md:mt-6 lg:mt-8 [image-rendering:pixelated] p-6 md:p-8 lg:p-12 bg-secondary-100 rounded-xl pointer-events-none"
                    src={QrCodePlaceholder}
                    width={38 * 10} height={38 * 10}
                    alt="qrcode"/>
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