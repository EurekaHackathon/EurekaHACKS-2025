import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { getApplicationStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";
import { createUserEvent, getUserEvent } from "@/lib/sqlc/events_sql";
import { decryptAES } from "@/lib/encryption";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const encryptedId = formData.get("encryptedId");
    const event = formData.get("event");

    if (!encryptedId || !event) {
        return new Response("Missing required fields", { status: 400 });
    }

    if (typeof (encryptedId) !== "string") {
        return new Response("Invalid encryptedId", { status: 400 });
    }

    if (typeof (event) !== "string") {
        return new Response("Invalid event", { status: 400 });
    }

    try {
        const decryptedId = decryptAES(process.env.QR_CODE_SECRET_KEY ?? "", encryptedId);

        // Check if user is accepted
        const userApplicationStatus = await getApplicationStatus(db, {
            userId: parseInt(decryptedId)
        });
        if (userApplicationStatus?.status !== "accepted") {
            return new Response("User is not accepted", { status: 403 });
        }

        // Check if user already scanned into this event
        const existingEvent = await getUserEvent(db, {
            userId: parseInt(decryptedId),
            name: event
        });

        if (existingEvent) {
            return new Response("User already scanned into this event", { status: 409 });
        }

        await createUserEvent(db, {
            userId: parseInt(decryptedId),
            name: event
        });
    } catch (error) {
        return new Response("Failed to scan user into event", { status: 500 });
    }

    return new Response("Successfully scanned user into event", { status: 200 });
}