import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    getPasswordResetTokenByToken,
} from "@/lib/sqlc/auth_sql";
import SetSessionCookie from "@/components/SetSessionCookie";
import RequestPasswordResetForm from "@/components/RequestPasswordResetForm";
import PasswordResetForm from "@/components/PasswordResetForm";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let passwordResetToken: string | string[] | undefined;
    let valid = true;
    let sessionToken: string | undefined;
    try {
        passwordResetToken = (await searchParams).token;
        if (!passwordResetToken || typeof passwordResetToken !== "string") {
            redirect("/login");
        }

        const token = await getPasswordResetTokenByToken(db, {
            token: passwordResetToken
        });

        if (!token) {
            valid = false;
        }

        // Check if the token is expired
        if (token && token.expiresAt < new Date()) {
            valid = false;
        }
    } catch (error) {
        console.log(error);
        redirect("/login");
    }

    return <>
        {valid ?
            <div className="bg-secondary-200 flex items-center justify-center py-32 flex-grow">
                <PasswordResetForm
                    token={passwordResetToken?.toString()}/>
            </div>
            :
            <>
                <div className="bg-secondary-200 flex items-center justify-center p-32 flex-grow min-h-screen">
                    <div
                        className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                        <h1 className="text-2xl md:text-4xl font-bold">Invalid reset link</h1>
                        <h2 className="md:text-xl font-medium pt-2">
                            Your reset is invalid or expired.
                        </h2>
                        <p className="pt-6">Please
                            <Link className="lg:pt-6 whitespace-pre font-semibold text-secondary-600"
                                  href="/request-password-reset"> request a new link.</Link>
                        </p>
                    </div>
                </div>
            </>
        }
    </>;
}