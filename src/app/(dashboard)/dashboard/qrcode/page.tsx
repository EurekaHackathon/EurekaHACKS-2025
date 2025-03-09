import { Suspense } from "react";
import UserQRCode from "@/components/UserQRCode";
import UserQRCodeSkeleton from "@/components/UserQRCodeSkeleton";

export default async function QRCodePage() {
    return (
        <Suspense fallback={<UserQRCodeSkeleton/>}>
            <UserQRCode/>
        </Suspense>
    );
}