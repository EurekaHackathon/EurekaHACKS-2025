"use server";

import { z } from "zod";
import { createUser, generateEmailVerificationToken } from "@/lib/auth";
import {
    createEmailVerificationToken,
    getUserByEmail, updateEmailVerificationToken
} from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import NodeMailer from "nodemailer";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { render } from "@react-email/components";
import { VerifyEmailTemplate } from "@/lib/emails/verify-email";

const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(128, { message: "First name must be less than 128 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(128, { message: "Last name must be less than 128 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .regex(/(?=.*\d)(?=.*[A-Za-z]).{8,128}$/, {
            message: "Password must contain at least one letter and one number, and be between 8 and 128 characters",
        }),
    confirmPassword: z.string({
        message: "Passwords do not match",
    }),
});

export const signUpWithEmail = async (prevState: any, formData: FormData) => {
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

    let emailVerificationTokenRecord;
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

        if (!user) {
            return { error: "Internal server error, please try again later" };
        }

        const emailVerificationToken = await generateEmailVerificationToken();
        // 15 minutes
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        emailVerificationTokenRecord = await createEmailVerificationToken(db, {
            token: emailVerificationToken,
            userId: user.id,
            expiresAt: tokenExpiry,
        });

        if (!emailVerificationTokenRecord) {
            return { error: "Internal server error, please try again later" };
        }

        const transporter = NodeMailer.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const headersList = await headers();
        const domain = headersList.get("host");
        const isHttp = process.env.DEV === "true";
        const emailHTML = await render(VerifyEmailTemplate({
            verificationLink: `${isHttp ? "http" : "https"}://${domain}/verify-email?token=${emailVerificationToken}`,
            userFirstname: user.firstName,
        }));

        const emailText = `
        Hi ${user.firstName},

        Thank you for creating a EurekaHACKS account! To get started, please verify your
        email address by clicking the link below. This will expire in 15 minutes.
        
        ${domain}/verify-email?token=${emailVerificationToken}
        
        Best,
        The EurekaHACKS Team
        `;

        const mailOptions = {
            from: `"EurekaHACKS" verify@eurekahacks.ca`,
            to: email,
            subject: "Verify your email",
            text: emailText,
            html: emailHTML,
        };

        await sendMailAsync(transporter, mailOptions);

    } catch (error) {
        console.error(error);
        return { error: "Internal server error, please try again later" };
    }
    redirect(`/verify-email-prompt?id=${emailVerificationTokenRecord.id}`);
};

export const resendEmailVerificationLink = async (prevState: any, formData: FormData) => {
    // TODO: Implement rate limiting
    try {
        const email = formData.get("email");

        if (!email || typeof email !== "string") {
            return { error: "Internal server error, please try again later." };
        }

        const user = await getUserByEmail(db, {
            email: email,
        });

        if (!user) {
            return { error: "Internal server error, please try again later." };
        }

        const id = formData.get("id");
        if (!id || typeof id !== "string") {
            return { error: "Internal server error, please try again later." };
        }

        const emailVerificationToken = await generateEmailVerificationToken();
        // 15 minutes
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        // Update the existing record so the id is the same
        const newToken = await updateEmailVerificationToken(db, {
            id: id,
            token: emailVerificationToken,
            expiresAt: tokenExpiry,
        });

        if (!newToken) {
            return { error: "Internal server error, please try again later." };
        }

        const transporter = NodeMailer.createTransport({
            host: "email-smtp.us-east-1.amazonaws.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const headersList = await headers();
        const domain = headersList.get("host");
        const isHttp = process.env.DEV === "true";
        const emailHTML = await render(VerifyEmailTemplate({
            verificationLink: `${isHttp ? "http" : "https"}://${domain}/verify-email?token=${emailVerificationToken}`,
            userFirstname: user.firstName,
        }));

        const emailText = `
        Hi ${user.firstName},

        Thank you for creating a EurekaHACKS account! To get started, please verify your
        email address by clicking the link below. This will expire in 15 minutes.
        
        ${domain}/verify-email?token=${emailVerificationToken}
        
        Best,
        The EurekaHACKS Team
        `;

        const mailOptions = {
            from: `"EurekaHACKS" verify@eurekahacks.ca`,
            to: email,
            subject: "Verify your email",
            text: emailText,
            html: emailHTML,
        };

        await sendMailAsync(transporter, mailOptions);

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Internal server error, please try again later." };
    }
};

const sendMailAsync = (transporter: NodeMailer.Transporter, mailOptions: NodeMailer.SendMailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};