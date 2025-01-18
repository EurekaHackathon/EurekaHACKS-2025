"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function SignUpPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <div className="bg-secondary-200 flex items-center justify-center py-32">
            <div className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] lg:min-w-[750px]">
                <h1 className="text-2xl md:text-4xl font-bold">Create an account</h1>
                <h2 className="md:text-xl font-medium pt-2">Sign up to apply to EurekaHACKS</h2>
                <form className="pt-12">
                    <div className="flex flex-col md:flex-row gap-4">
                        <label className="flex flex-col md:text-lg w-full">
                            First Name
                            <input
                                className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                type="text"
                                name="first-name" placeholder="First Name"/>
                        </label>
                        <label className="flex flex-col md:text-lg w-full">
                            Last Name
                            <input
                                className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                type="text"
                                name="first-name" placeholder="Last Name"/>
                        </label>
                    </div>
                    <label className="pt-4 lg:pt-6 flex flex-col md:text-lg">
                        Email
                        <input
                            className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                            type="email"
                            name="email" placeholder="hello@eurekahacks.ca"/>
                    </label>
                    <div className="pt-4 lg:pt-6 flex flex-col md:flex-row gap-4">
                        <label className="flex flex-col md:text-lg w-full">
                            Password
                            <div className="flex mt-2 items-center">
                                <input
                                    className="rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-200 focus:outline-none w-full"
                                    type={passwordVisible ? "text" : "password"}
                                    name="password" placeholder="••••••••••••"/>
                                <div>
                                    <Icon onClick={() => setPasswordVisible(!passwordVisible)}
                                          className="text-2xl -ml-12 text-gray-400"
                                          icon={passwordVisible ? "mdi:show-outline" : "mdi:hide-outline"}/>
                                </div>
                            </div>
                        </label>
                        <label className="flex flex-col md:text-lg w-full">
                            Confirm Password
                            <div className="flex mt-2 items-center">
                                <input
                                    className="rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-200 focus:outline-none w-full"
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    name="confirm-password" placeholder="••••••••••••"/>
                                <div>
                                    <Icon onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                          className="text-2xl -ml-12 text-gray-400"
                                          icon={confirmPasswordVisible ? "mdi:show-outline" : "mdi:hide-outline"}/>
                                </div>
                            </div>
                        </label>
                    </div>
                    <button
                        className="bg-secondary-500 text-gray-50 font-semibold md:text-xl mt-8 w-full py-4 rounded-xl hover:bg-[#947ef2] duration-200"
                        type="submit">
                        Sign Up
                    </button>
                </form>
                <button
                    className="flex items-center justify-center gap-2 border font-semibold border-gray-300 md:text-xl mt-4 w-full py-4 rounded-xl hover:border-secondary-500 duration-200">
                    <div className="min-w-6 md:min-w-8">
                        <Icon icon="logos:google-icon" className="text-xl md:text-2xl"/>
                    </div>
                    Sign up with Google
                </button>
                <button
                    className="flex items-center justify-center gap-2 border font-semibold border-gray-300 md:text-xl mt-4 w-full py-4 rounded-xl hover:border-secondary-500 duration-200">
                    <div className="min-w-6 md:min-w-8">
                        <Icon icon="logos:github-icon" className="text-xl md:text-2xl"/>
                    </div>
                    Sign up with Github
                </button>
                <h2 className="pt-8 text-center text-sm md:text-lg">Already have an account? <a
                    className="font-semibold underline"
                    href="/signin">Log in</a></h2>
            </div>
        </div>
    );
}