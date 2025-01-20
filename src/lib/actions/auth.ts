import { z } from "zod";
import { createUser } from "@/lib/auth";
import { getUserByEmail } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";

const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(128, { message: "First name must be less than 128 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(128, { message: "Last name must be less than 128 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .regex(/^(?=.*[a-zA-Z])(?=.*\\d).{8,128}$/, {
            message: "Password must contain at least one letter and one number, and be between 8 and 128 characters",
        }),
    confirmPassword: z.string({
        message: "Passwords do not match",
    }),
});

export const signUp = async (prevState: any, formData: FormData) => {
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    const validationResult = signUpSchema.safeParse({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    });

    if (!validationResult.success) {
        return { error: validationResult.error.errors[0].message };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    if (!email || !password || !firstName || !lastName || typeof email !== "string" || typeof password !== "string" || typeof firstName !== "string" || typeof lastName !== "string") {
        return { error: "All fields are required" };
    }

    try {
        const existingUser = await getUserByEmail(db, {
            email: email,
        });

        if (existingUser) {
            return { error: "Email is already in use" };
        }

        const user = await createUser({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });
    } catch (error) {
        console.error(error);
        return { error: "Internal server error, please try again later" };
    }

    // TODO: Finish writing action
    return null;
};