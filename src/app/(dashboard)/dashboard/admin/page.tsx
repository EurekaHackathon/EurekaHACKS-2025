import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function ApplicationPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);
    if (!user) {
        redirect("/login");
    }
    if (!user.isAdmin) {
        redirect("/dashboard");
    }

    return (
        <div>
            <h1>
                sdfsdfj
            </h1>
        </div>
    )
}