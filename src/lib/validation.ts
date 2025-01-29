import { z } from "zod";

export const emailSchema = z.string()
    .email({ message: "Invalid email" });

export const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, { message: "Password must contain at least one letter and one number" });

export const nameSchema = z.string()
    .min(1, { message: "Name is required" })
    .max(128, { message: "Name must be less than 128 characters long" });

export const signUpSchema = z.object({
    firstName: z.string()
        .min(1, { message: "First name is required" })
        .max(128, { message: "First name must be less than 128 characters" }),
    lastName: z.string()
        .min(1, { message: "Last name is required" })
        .max(128, { message: "Last name must be less than 128 characters" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string({ message: "Passwords do not match" }),
});

export const loginSchema = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
});