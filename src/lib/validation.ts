import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email" });

const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, { message: "Password must contain at least one letter and one number" });

const nameSchema = z.string()
    .min(1, { message: "Name is required" })
    .max(128, { message: "Name must be less than 128 characters long" });