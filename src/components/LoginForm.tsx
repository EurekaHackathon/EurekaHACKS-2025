"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { loginWithEmail } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

const initialState = {
    error: ""
};

const loginWithGithub = async () => {
    const res = await fetch("/login/github", {
        method: "POST",
    });
    if (!res.ok) {
        throw new Error("Failed to sign up with Github");
    }
    const { url } = await res.json();
    redirect(url);
};

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, formAction, pending] = useActionState(loginWithEmail, initialState);

    return (
        <div
            className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
            <h1 className="text-2xl md:text-4xl font-bold">Log in to your account</h1>
            <h2 className="md:text-xl font-medium pt-2">Log in to apply to EurekaHACKS</h2>
            <form className="pt-12" action={formAction}>
                <label className="flex flex-col md:text-lg">
                    Email
                    <input
                        className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                        type="email"
                        required
                        name="email" placeholder="hello@eurekahacks.ca"/>
                </label>
                <label className="flex flex-col md:text-lg pt-6">
                    Password
                    <div className="flex mt-2 items-center">
                        <input
                            className="rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-200 focus:outline-none w-full"
                            type={passwordVisible ? "text" : "password"}
                            required
                            name="password" placeholder="••••••••••••"/>
                        <div className="cursor-pointer">
                            <Icon onClick={() => setPasswordVisible(!passwordVisible)}
                                  className="text-2xl -ml-12 text-gray-400"
                                  icon={passwordVisible ? "mdi:show-outline" : "mdi:hide-outline"}/>
                        </div>
                    </div>
                </label>
                <p className="mt-6 min-h-6 text-red-400 font-semibold break-words">
                    {!pending && state?.error}
                </p>
                <button
                    className="mt-2 flex justify-center bg-secondary-500 text-gray-50 font-semibold md:text-xl w-full py-4 rounded-xl hover:bg-[#947ef2] duration-200"
                    type="submit" disabled={pending}>
                    {!pending && "Log in"}
                    {/*Absolute position, so the height doesn't get messed up. Zero width space used to maintain minimum height*/}
                    {pending && "​"}
                    {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
                </button>
            </form>
            <button
                className="flex items-center justify-center gap-2 border font-semibold border-gray-300 md:text-xl mt-4 w-full py-4 rounded-xl hover:border-secondary-500 duration-200">
                <div className="min-w-6 md:min-w-8">
                    <Icon icon="logos:google-icon" className="text-xl md:text-2xl"/>
                </div>
                Log in with Google
            </button>
            <button onClick={loginWithGithub}
                    className="flex items-center justify-center gap-2 border font-semibold border-gray-300 md:text-xl mt-4 w-full py-4 rounded-xl hover:border-secondary-500 duration-200">
                <div className="min-w-6 md:min-w-8">
                    <Icon icon="logos:github-icon" className="text-xl md:text-2xl"/>
                </div>
                Log in with Github
            </button>
            <h2 className="pt-8 text-center text-sm md:text-lg">Don't have an account? <Link
                className="font-semibold underline"
                href="/register">Sign up</Link></h2>
        </div>
    );
}