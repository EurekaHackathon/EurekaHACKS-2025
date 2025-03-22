import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { getApplicationStatus, rsvpUser } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    try {
        const user = await authorizeSession(sessionId?.value);
        if (!user) {
            return new Response("Unauthorized", {status: 401});
        }

        const userApplicationStatus = await getApplicationStatus(db, {
            userId: user.id
        });

        if (!userApplicationStatus || userApplicationStatus.status !== "accepted") {
            return new Response("Unauthorized", {status: 401});
        }

        await rsvpUser(db, {
            userId: user.id
        });

    } catch (error) {
        return new Response("Failed to rsvp user", {status: 500});
    }

    return new Response("Sucessfully rsvped", {status: 200});
}