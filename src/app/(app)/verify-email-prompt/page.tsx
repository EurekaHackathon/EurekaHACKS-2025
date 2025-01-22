import { getEmailByVerificationTokenID } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";

export default async function VerifyEmailPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // const verificationTokenID = (await searchParams).id;
    // if (!verificationTokenID || typeof verificationTokenID !== "string") {
    //     redirect("/signin");
    // }
    //
    // const email = getEmailByVerificationTokenID(db, {
    //     id: verificationTokenID
    // });
    //
    // if (!email) {
    //     redirect("/signin");
    // }

    return (
        <div className="bg-secondary-200 flex items-center justify-center py-32 min-h-screen">
            <div
                className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                <h1 className="text-2xl md:text-4xl font-bold">Please verify your email</h1>
                <h2 className="md:text-xl font-medium pt-2">
                    You're almost there! We sent an email to
                    {/*TODO: Change*/}
                    <span className="font-bold text-secondary-600 pl-1.5">aaronye1001@gmail.com</span>.
                </h2>
                <p className="pt-4 lg:pt-6">
                    Just click the link in that email to complete your signup. If you don't see it, you may need to
                    <b className="pl-1.5">check your spam folder</b>.
                </p>
                <p className="pt-6">Still can't find the email?</p>
                <form>
                    <button
                        className="mt-2 flex justify-center bg-secondary-500 text-gray-50 font-semibold md:text-xl w-full py-4 rounded-xl hover:bg-[#947ef2] duration-200"
                        type="submit">
                        Resend Email
                    </button>
                </form>
            </div>
        </div>
    );
}