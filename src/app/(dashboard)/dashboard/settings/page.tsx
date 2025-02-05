import SettingsForm from "@/components/SettingsForm";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";

export default async function ApplicationPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);

    return (
        <div className="px-20">
            <div className="my-[10vh] max-w-screen-lg m-auto">
                <SettingsForm currentFirstName={user.firstName ?? ""} currentLastName={user.lastName ?? ""}
                            loginMethod={user.accountType}/>
            </div>
        </div>
    );
}