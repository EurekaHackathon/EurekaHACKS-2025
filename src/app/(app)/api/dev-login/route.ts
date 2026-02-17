import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    if (process.env.DEV !== "true") {
        return NextResponse.json({ error: "Not available in production" }, { status: 403 });
    }

    // Set a special dev session cookie (no database needed)
    const cookieStore = await cookies();
    cookieStore.set("session", "dev-session", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", "http://localhost:3000"));
}
