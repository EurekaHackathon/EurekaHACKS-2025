import { cookies } from "next/headers";

export async function POST(request: Request) {
    const res = await request.json();
    const sessionToken: string = res.sessionToken;

    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.DEV !== "true",
        sameSite: "lax",
    });

    return new Response("ok", {
        status: 200,
    });
}