"use client";


async function setCookie(sessionToken: string) {
    try {
        await fetch("http://localhost:3000/api/set-session-cookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionToken })
        });
    } catch (e) {
        console.error(e);
    }
}

export default function SetSessionCookie({ sessionToken }: { sessionToken: string }) {
    setCookie(sessionToken);
    return null;
}