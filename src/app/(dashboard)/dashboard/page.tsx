import { authorizeSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);

    return (
        <div>
            <h1 className="text-5xl font-bold text-gray-700">Welcome, <span
                className="text-secondary-600">{user.firstName}</span></h1>
        </div>
    );
}