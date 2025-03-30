"use client";

import { Icon } from "@iconify/react";
import { useActionState, useState } from "react";
import { resetPassword } from "@/lib/actions/auth";

const initialState = {
    error: ""
};

export default function PasswordResetForm({token}: { token: string }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [state, formAction, pending] = useActionState(resetPassword, initialState);
    return (
        <div
            className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
            <h1 className="text-2xl md:text-4xl font-bold">Reset your password</h1>
            <h2 className="md:text-xl font-medium pt-2">Enter your new password below</h2>
            <form className="pt-12" action={formAction}>
                <label className="flex flex-col md:text-lg pt-6">
                    New password
                    <div className="flex mt-2 items-center">
                        <input name="token" hidden={true} value={token} readOnly={true}/>
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
                <label className="flex flex-col md:text-lg pt-6">
                    Confirm new password
                    <div className="flex mt-2 items-center">
                        <input
                            className="rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-200 focus:outline-none w-full"
                            type={passwordVisible ? "text" : "password"}
                            required
                            name="confirm-password" placeholder="••••••••••••"/>
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
                    {!pending && "Reset password"}
                    {/*Absolute position, so the height doesn't get messed up. Zero width space used to maintain minimum height*/}
                    {pending && "​"}
                    {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute" icon="codex:loader"/>}
                </button>
            </form>
        </div>
    );
}