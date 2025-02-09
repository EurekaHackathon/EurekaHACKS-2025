import { z } from "zod";

export const emailSchema = z.string()
    .email({ message: "Invalid email" });

export const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, { message: "Password must contain at least one letter and one number" });

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

export const applicationSchema = z.object({
    firstName: z.string()
        .min(1, { message: "First name is required" })
        .max(128, { message: "First name must be less than 128 characters" }),
    lastName: z.string()
        .min(1, { message: "Last name is required" })
        .max(128, { message: "Last name must be less than 128 characters" }),
    email: emailSchema,
    age: z.number()
        .int()
        .min(1, { message: "Please enter a valid age" })
        .max(150, { message: "Please enter a valid age" }),
    school: z.string()
        .min(1, { message: "School is required" })
        .max(256, { message: "School must be less than 256 characters" }),
    graduationYear: z.number()
        .int()
        .min(2000, { message: "Please enter a valid graduation year" })
        .max(2030, { message: "Please enter a valid graduation year" }),
    city: z.string()
        .min(1, { message: "City is required" })
        .max(256, { message: "City must be less than 128 characters" }),
    numberHackathonsAttended: z.number()
        .int()
        .min(0, { message: "Invalid number of hackathons attended" })
        .max(1000, { message: "Invalid number of hackathons attended" }),
    shortAnswer: z.string()
        .min(1, { message: "Short answer is required" })
        .max(300, { message: "Short answer must be less than 300 characters or less" }),
    lactoseIntolerant: z.boolean(),
    halal: z.boolean(),
    vegetarian: z.boolean(),
    vegan: z.boolean(),
    glutenFree: z.boolean(),
    otherDietaryRestrictions: z.string()
        .min(1, { message: "Please specify a dietary restrictions for other" })
        .max(1024, { message: "Dietary restrictions must be less than 1024 characters" }),
    github: z.string().url({ message: "Invalid GitHub URL" }),
    linkedin: z.string().url({ message: "Invalid LinkedIn URL" }),
    portfolio: z.string().url({ message: "Invalid portfolio URL" }),
    resume: z.string().url({ message: "Invalid resume URL" }),
    emergencyContactFullName: z.string()
        .min(1, { message: "Emergency contact full name is required" })
        .max(128, { message: "Emergency contact full name must be less than 128 characters" }),
    emergencyContactPhoneNumber: z.string()
        .min(14, { message: "Please enter a valid phone number" })
        .max(14, { message: "Please enter a valid phone number" }),

});