"use client";

import { useActionState } from "react";
import { logout } from "@/lib/actions/auth";
import { Icon } from "@iconify/react";

export function SignOutForm() {
    const [state, formAction, pending] = useActionState(logout, {});

    return (
        <form action={formAction}>
            <button type="submit" disabled={pending}
                    className="text-gray-600 flex items-center justify-center gap-2 border font-semibold border-gray-300
                     py-1 px-12 rounded-xl hover:border-secondary-500 duration-200">
                {!pending && "Log out"}
                {/*Absolute position, so the height doesn't get messed up. Zero width space used to maintain minimum height*/}
                {pending && "​"}
                {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
            </button>
        </form>
    );
}