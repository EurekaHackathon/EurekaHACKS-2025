import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    getPasswordResetTokenByToken,
} from "@/lib/sqlc/auth_sql";
import PasswordResetForm from "@/components/PasswordResetForm";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
    return <>
        <div className="bg-secondary-200 flex items-center justify-center p-32 flex-grow min-h-screen">
            <div
                className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[70vw] lg:min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                <h1 className="text-xl md:text-4xl font-bold">Successfully reset password</h1>
                <h2 className="md:text-xl font-medium pt-2">
                    Your password has been changed
                </h2>
                <p className="pt-6">You may
                    <Link className="lg:pt-6 whitespace-pre font-semibold text-secondary-600"
                          href="/login"> log in</Link> now.
                </p>
            </div>
        </div>
    </>;
}