import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/lib/oauth";
import { cookies } from "next/headers";

export async function POST(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, ["profile"]);

    (await cookies()).set("google_oauth_state", state, {
        path: "/",
        httpOnly: true,
        secure: process.env.DEV !== "true",
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });
    (await cookies()).set("google_code_verifier", codeVerifier, {
        path: "/",
        httpOnly: true,
        secure: process.env.DEV !== "true",
        maxAge: 60 * 10, // 10 minutes
        sameSite: "lax"
    });

    // Return url to redirect to
    return Response.json({ url });
}