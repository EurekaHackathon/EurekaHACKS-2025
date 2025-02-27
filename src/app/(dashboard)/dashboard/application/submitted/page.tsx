import { Icon } from "@iconify/react";
import Link from "next/link";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { getApplicationStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";

export default async function () {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");
    const user = await authorizeSession(sessionToken?.value);
    if (!user) {
        redirect("/login");
    }

    const applicationStatus = await getApplicationStatus(db, {
        userId: user.id
    });

    if (applicationStatus?.status !== "submitted") {
        redirect("/dashboard/application");
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-gray-700">
            <Icon className="text-6xl text-green-400 mb-8" icon="rivet-icons:check-circle-breakout"/>
            <h1 className="text-5xl font-semibold">Application submitted!</h1>
            <p className="text-lg mt-4">Thank you for applying to our hackathon. We will review your application and
                get back to you soon.</p>
            <Link className="border border-gray-300 text-xl px-4 py-2 rounded-xl mt-8" href="/dashboard">Back to
                dashboard</Link>
        </div>
    );
}