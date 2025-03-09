import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { updateApplicationStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const applicationId = formData.get("applicationId");
    const status = formData.get("status");

    if (!applicationId || typeof applicationId !== "string" || isNaN(parseInt(applicationId))) {
        return new Response("Invalid application ID", { status: 400 });
    }

    if (!status || typeof status !== "string") {
        return new Response("Invalid status", { status: 400 });
    }

    try {
        await updateApplicationStatus(db, {
            id: parseInt(applicationId),
            status: status
        });

        return new Response("Success", { status: 200 });
    } catch (e) {
        return new Response("Error", { status: 500 });
    }
}