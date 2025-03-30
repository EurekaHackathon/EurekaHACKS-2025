"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/actions/auth";

const initialState = {
    error: "",
};

export default function RequestPasswordResetForm() {
    const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);
    return (
        <div
            className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
            <h1 className="text-2xl md:text-4xl font-bold">Reset Password</h1>
            <h2 className="md:text-xl font-medium pt-2">Enter your email to reset your password</h2>
            <form className="pt-12" action={formAction}>
                <label className="flex flex-col md:text-lg">
                    Email
                    <input
                        className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                        type="email"
                        required
                        name="email" placeholder="hello@eurekahacks.ca"/>
                </label>
                <p className="mt-6 min-h-6 text-red-400 font-semibold break-words">
                    {!pending && state?.error}
                </p>
                <button
                    className="mt-2 flex justify-center bg-secondary-500 text-gray-50 font-semibold md:text-xl w-full py-4 rounded-xl hover:bg-[#947ef2] duration-200"
                    type="submit" disabled={pending}>
                    {!pending && "Request reset"}
                    {/*Absolute position, so the height doesn't get messed up. Zero width space used to maintain minimum height*/}
                    {pending && "​"}
                    {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
                </button>
            </form>
            <h2 className="pt-8 text-center text-sm md:text-lg"><Link
                className="font-semibold underline duration-100 hover:text-gray-500"
                href="/register">Log in instead</Link></h2>
        </div>
    );
}