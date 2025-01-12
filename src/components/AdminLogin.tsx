"use client";

import { loginAdmin } from "@/lib/auth";
import { useState } from "react";

export default function AdminLogin() {
    const [message, setMessage] = useState<string>("");

    return (
        <form action={async (formdata) => {
            let password = formdata.get("password");
            if (password) {
                let valid = await loginAdmin(password as string)
                
                if (!valid) {
                    setMessage("Wrong");
                }
            }
        }}>
            <p>Sign into admin</p>
            <input type="password" name="password" />
            <input type="submit" value="Submit" />
            {message && <p style={{color: "red"}}>{message}</p>}
        </form>
    );
}