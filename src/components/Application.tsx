import ApplicationForm from "@/components/ApplicationForm";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { getApplicationStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";
import { Icon } from "@iconify/react";

export default async function Application() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");
    const user = await authorizeSession(sessionToken?.value);
    if (!user) {
        redirect("/login");
    }

    const applicationStatus = await getApplicationStatus(db, {
        userId: user.id
    });

    return (
        <>
            {(applicationStatus === null || applicationStatus.status === "unsubmitted") &&
                <div className="px-8 xl:px-16 text-gray-700">
                  <div className="my-[10vh] m-auto">
                    <h1 className="text-5xl font-bold">Application</h1>
                    <ApplicationForm/>
                  </div>
                </div>
            }
            {applicationStatus?.status === "submitted" &&
                <div className="flex flex-col justify-center items-center h-screen text-gray-700 px-12 lg:px-20">
                  <Icon className="text-6xl text-green-400 mb-8" icon="rivet-icons:check-circle-breakout"/>
                  <h1 className="text-5xl font-semibold">Application submitted!</h1>
                  <p className="text-lg mt-4">Thank you for applying to our hackathon. We will review your application
                    and
                    get back to you soon.</p>
                </div>
            }
        </>
    );
}
