import { github } from "@/lib/oauth";
import { cookies } from "next/headers";
import type { OAuth2Tokens } from "arctic";
import { createGithubUser, getUserByGithubID } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { generateSessionToken } from "@/lib/auth";
import { createSession } from "@/lib/sessions";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = (await cookies()).get("github_oauth_state")?.value ?? null;
    if (code === null || state === null || storedState === null) {
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
        tokens = await github.validateAuthorizationCode(code);
    } catch {
        // Invalid code or client credentials
        return new Response("Please restart the process.", {
            status: 400
        });
    }
    const githubAccessToken = tokens.accessToken();
    const userRequest = new Request("https://api.github.com/user");
    userRequest.headers.set("Authorization", `Bearer ${githubAccessToken}`);
    const userResponse = await fetch(userRequest);

    if (!userResponse.ok) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    const userResult = await userResponse.json();
    const githubUserId: number | undefined = userResult.id;

    if (!githubUserId) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    const name: string | undefined = userResult.name;
    const firstName = name?.split(" ", 2)[0];
    const lastName = name?.split(" ", 2)[1];

    const existingUser = await getUserByGithubID(db, {
        oauthId: githubUserId.toString()
    });

    if (existingUser !== null) {
        const sessionToken = await generateSessionToken();
        await createSession(sessionToken, existingUser.id);

        const cookieStore = await cookies();
        cookieStore.set("session", sessionToken, {
            httpOnly: true,
            secure: process.env.DEV !== "true",
            sameSite: "lax",
            // 30 days
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/dashboard"
            }
        });
    }

    const user = await createGithubUser(db, {
        oauthId: githubUserId.toString(),
        firstName: firstName ?? "",
        lastName: lastName ?? "",
    });

    if (!user) {
        return new Response("Internal server error", {
            status: 500
        });
    }

    const sessionToken = await generateSessionToken();
    await createSession(sessionToken, user.id);

    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.DEV !== "true",
        sameSite: "lax",
        // 30 days
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/dashboard"
        }
    });
}