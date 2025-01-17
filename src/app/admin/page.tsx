import AdminLogin from "@/components/AdminLogin";
import { isAdmin, signoutAdmin } from "@/lib/auth";

export default async function Admin() {
    if (!await isAdmin()) {
        return <AdminLogin />
    }

    return (
        <>
            <div>You are an admin</div>
            <button onClick={signoutAdmin}>Signout</button>
        </>
    );
}