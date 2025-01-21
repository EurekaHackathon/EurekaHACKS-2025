"use client";

import React, { useState, useRef, useEffect } from "react";

export default function VerifyEmailPage() {
    const [code, setCode] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const base32Regex = /^[A-Z2-7]+$/;
        if (base32Regex.test(e.target.value.toUpperCase()) || e.target.value === "") {
            setCode(e.target.value.toUpperCase());
        }
    };

    const handleDivClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="bg-secondary-200 flex items-center justify-center py-32 min-h-screen">
            <div className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700">
                <h1 className="text-2xl md:text-4xl font-bold">Please verify your email</h1>
                <h2 className="md:text-xl font-medium pt-2">A code was sent to your inbox</h2>
                <form className="pt-8 lg:pt-12">
                    <label className="flex flex-col md:text-lg font-medium">
                        Verification Code
                        <input
                            className="absolute opacity-0"
                            type="text"
                            name="code"
                            value={code}
                            onInput={onTextInput}
                            maxLength={8}
                            placeholder="A1B2C3D4"
                            ref={inputRef}
                        />
                        <div className="flex gap-1 lg:gap-2 pt-1 lg:pt-4" onClick={handleDivClick}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-center rounded-lg lg:rounded-xl border border-gray-300 cursor-text
                                    ${code.length > i ? "border-secondary-500 border-2 bg-gray-100" : ""}`}
                                    key={i}>
                                    {code.length >= i &&
                                        <h1 className="font-semibold md:text-lg lg:text-xl text-secondary-950">{code[i]}</h1>}
                                    {code.length === i && <div className="h-4 lg:h-6 border border-gray-500 blink"/>}
                                </div>
                            ))}
                        </div>
                        <button
                            className="bg-secondary-500 text-gray-50 font-semibold md:text-xl mt-4 lg:mt-8 w-full py-2 lg:py-4 rounded-xl hover:bg-[#947ef2] duration-200"
                            type="submit">
                            Verify
                        </button>
                    </label>
                </form>
                <form>
                    <h2 className="pt-8 text-center text-sm md:text-lg">Didn't receive the code?
                        <button className="font-semibold underline pl-1 text-secondary-600"
                                type="submit">Resend</button>
                    </h2>
                </form>
            </div>
        </div>
    );
}