import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSessionToken } from "@/lib/sessions";

export default async function SignUpPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");
    
    if (sessionToken) {
        const sessionValidationResult = await validateSessionToken(sessionToken.value);
        if (sessionValidationResult.session && sessionValidationResult.user) {
            redirect("/dashboard");
        }
    }

    return (
        <div className="bg-secondary-200 flex items-center justify-center py-32 flex-grow">
            <LoginForm/>
        </div>
    );
}