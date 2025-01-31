import { google } from "@/lib/oauth";
import { cookies } from "next/headers";

import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { createGithubUser, getUserByGoogleID } from "@/lib/sqlc/auth_sql";
import { generateSessionToken } from "@/lib/auth";
import { createSession } from "@/lib/sessions";
import { db } from "@/lib/database";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = (await cookies()).get("google_oauth_state")?.value ?? null;
    const codeVerifier = (await cookies()).get("google_code_verifier")?.value ?? null;
    if (code === null || state === null || storedState === null || codeVerifier === null) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }
    if (state !== storedState) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    const claims: any = decodeIdToken(tokens.idToken());

    const googleId: string | undefined = claims.sub;
    const name: string | undefined = claims.name;

    if (googleId === undefined || name === undefined) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    const existingUser = await getUserByGoogleID(db, {
        oauthId: googleId
    });
    if (existingUser !== null) {
        const sessionToken = await generateSessionToken();
        await createSession(sessionToken, existingUser.id);

        (await cookies()).set("session", sessionToken, {
            httpOnly: true,
            secure: process.env.DEV !== "true",
            sameSite: "lax",
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/dashboard"
            }
        });
    }

    const user = await createGithubUser(db, {
        oauthId: googleId,
        firstName: name.split(" ", 2)[0] ?? "",
        lastName: name.split(" ", 2)[1] ?? "",
    });

    if (!user) {
        return new Response("Internal server error", {
            status: 500
        });
    }

    const sessionToken = await generateSessionToken();
    await createSession(sessionToken, user.id);

    (await cookies()).set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.DEV !== "true",
        sameSite: "lax",
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/dashboard"
        }
    });
}