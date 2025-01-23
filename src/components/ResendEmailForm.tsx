"use client";

import { resendEmailVerificationLink } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Icon } from "@iconify/react";

const initialState = {
    error: ""
};

export function ResendEmailForm(props: { email: string, id: string }) {
    const [state, formAction, pending] = useActionState(resendEmailVerificationLink, initialState);

    return <form action={formAction}>
        <input name="email" value={props.email} hidden readOnly/>
        <input name="id" value={props.id} hidden readOnly/>
        <h2 className="text-red-400 font-semibold">
            {!pending && state?.error}
            {(!pending && state?.success) &&
                <span className="text-green-500">A new email has been sent, please check your inbox.</span>
            }
        </h2>
        <button
            className="mt-2 flex justify-center bg-secondary-500 text-gray-50 font-semibold md:text-xl w-full py-4 rounded-xl hover:bg-[#947ef2] duration-200"
            type="submit" disabled={pending}>
            {!pending && "Resend email"}
            {/*Absolute position, so the height doesn't get messed up. Zero width space used to maintain minimum height*/}
            {pending && "​"}
            {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
        </button>
    </form>;
}