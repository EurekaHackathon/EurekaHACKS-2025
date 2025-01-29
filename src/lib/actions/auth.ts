"use server";

import {
    createUser,
    generateEmailVerificationToken,
    generateSessionToken
} from "@/lib/auth";
import {
    createEmailVerificationToken, deleteAllEmailVerificationTokensByUserID, getUserByEmail
} from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import NodeMailer from "nodemailer";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { render } from "@react-email/components";
import { VerifyEmailTemplate } from "@/lib/emails/verify-email";
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";
import { createSession, invalidateSession } from "@/lib/sessions";
import { loginSchema, signUpSchema } from "../validation";


export const logout = async (prevState: any, formData: FormData) => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (sessionCookie) {
        try {
            await invalidateSession(sessionCookie.value);
        } catch (error) {
            console.error(error);
        }
        cookieStore.delete("session");
    }

    redirect("/login");
};


export const loginWithEmail = async (prevState: any, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const validationResult = loginSchema.safeParse({
        email: email,
        password: password,
    });

    if (!validationResult.success) {
        return { error: validationResult.error.errors[0].message };
    }

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        return { error: "All fields are required" };
    }

    let emailVerificationTokenRecord;
    let emailVerified = true;
    try {
        const user = await getUserByEmail(db, {
            email: email,
        });

        if (!user) {
            return { error: "Invalid email or password" };
        }

        const passwordMatches = await verify(user.password, password);
        if (!passwordMatches) {
            return { error: "Invalid email or password" };
        }

        if (!user.emailVerified) {
            emailVerified = false;
            await deleteAllEmailVerificationTokensByUserID(db, {
                userId: user.id,
            });

            const emailVerificationToken = await generateEmailVerificationToken();
            // 15 minutes

            const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

            emailVerificationTokenRecord = await createEmailVerificationToken(db, {
                token: emailVerificationToken,
                userId: user.id,
                expiresAt: tokenExpiry,
            });

            await sendVerificationEmail({
                emailVerificationToken: emailVerificationToken,
                firstName: user.firstName,
                email: email,
            });
        } else {
            const sessionToken = await generateSessionToken();
            await createSession(sessionToken, user.id);

            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set("session", sessionToken, {
                httpOnly: true,
                secure: process.env.DEV !== "true",
                sameSite: "lax",
            });
        }

    } catch (error) {
        console.error(error);
        return { error: "Internal server error, please try again later" };
    }
    if (emailVerified) {
        redirect("/dashboard");
    } else {
        redirect(`/verify-email-prompt?id=${emailVerificationTokenRecord!.id}`);
    }
};

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
            return { error: "An account with this email already exists" };
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

        await sendVerificationEmail({
            emailVerificationToken: emailVerificationToken,
            firstName: firstName,
            email: email,
        });

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

        // Check if email is already verified
        if (user.emailVerified) {
            return { error: "Email is already verified" };
        }

        await deleteAllEmailVerificationTokensByUserID(db, {
            userId: user.id,
        });

        const emailVerificationToken = await generateEmailVerificationToken();
        // 15 minutes
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        // Update the existing record so the id is the same
        const newToken = await createEmailVerificationToken(db, {
            token: emailVerificationToken,
            userId: user.id,
            expiresAt: tokenExpiry,
        });

        if (!newToken) {
            return { error: "Internal server error, please try again later." };
        }

        await sendVerificationEmail({
            emailVerificationToken: emailVerificationToken,
            firstName: user.firstName,
            email: email,
        });

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

interface SendVerificationEmailProps {
    emailVerificationToken: string;
    firstName: string;
    email: string;
}

const sendVerificationEmail = async ({ emailVerificationToken, firstName, email }: SendVerificationEmailProps) => {
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
        userFirstname: firstName,
    }));

    const emailText = `
                Hi ${firstName},
        
                Thank you for creating a EurekaHACKS account! To get started, please verify your
                email address by clicking the link below. This will expire in 15 minutes.
                
                ${domain}/verify-email?token=${emailVerificationToken}
                
                Best,
                The EurekaHACKS Team
                `;

    const mailOptions = {
        from: `"EurekaHACKS" verify@eurekahacks.ca`,
        to: email,
        subject: "Verify your email for EurekaHACKS",
        text: emailText,
        html: emailHTML,
    };

    await sendMailAsync(transporter, mailOptions);
};