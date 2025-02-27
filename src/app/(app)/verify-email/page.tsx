import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    deleteAllEmailVerificationTokensByUserID,
    getEmailVerificationTokenByToken,
    verifyUserEmail
} from "@/lib/sqlc/auth_sql";
import { generateSessionToken } from "@/lib/auth";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import SetSessionCookie from "@/components/SetSessionCookie";

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let emailVerificationToken: string | string[] | undefined;
    let valid = true;
    let sessionToken: string | undefined;
    try {
        emailVerificationToken = (await searchParams).token;
        if (!emailVerificationToken || typeof emailVerificationToken !== "string") {
            redirect("/login");
        }

        const token = await getEmailVerificationTokenByToken(db, {
            token: emailVerificationToken
        });

        if (!token) {
            valid = false;
        }

        // Check if the token is expired
        if (token && token.expiresAt < new Date()) {
            valid = false;
        }

        // Verify the user
        if (valid && token) {
            await verifyUserEmail(db, {
                id: token.userId
            });
        }

        // Delete the token
        if (valid && token) {
            await deleteAllEmailVerificationTokensByUserID(db, {
                userId: token.userId
            });
        }

        if (valid && token) {
            sessionToken = await generateSessionToken();
            await createSession(sessionToken, token.userId);
        }
    } catch (error) {
        console.log(error);
        redirect("/login");
    }

    return (
        <div className="bg-secondary-200 flex items-center justify-center p-32 flex-grow min-h-screen">
            <div
                className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                {valid ?
                    <>
                        <h1 className="text-2xl md:text-4xl font-bold">Verified!</h1>
                        <h2 className="md:text-xl font-medium pt-2">
                            Your email has been verified.
                        </h2>
                        <p className="pt-6">
                            You are now logged in. You can now access your
                            <Link className="lg:pt-6 whitespace-pre font-semibold text-secondary-600"
                                  href="/dashboard"> dashboard</Link>
                            .
                        </p>
                        <SetSessionCookie sessionToken={sessionToken ?? ""}/>
                    </>
                    :
                    <>
                        <h1 className="text-2xl md:text-4xl font-bold">Invalid verification link</h1>
                        <h2 className="md:text-xl font-medium pt-2">
                            Your link is invalid or expired.
                        </h2>
                        <p className="pt-6">Please
                            <Link className="lg:pt-6 whitespace-pre font-semibold text-secondary-600"
                                  href="/login"> log in </Link>
                            again to receive a new email.
                        </p>
                    </>
                }
            </div>
        </div>
    );
}