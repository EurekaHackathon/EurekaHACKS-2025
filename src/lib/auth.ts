"use server";

import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { db } from "@/lib/database";
import { createDBUser, CreateDBUserRow, updateDBUserPassword } from "@/lib/sqlc/auth_sql";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
}

interface userData {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

/**
 * @throws {Error}
 */
export async function createUser(userData: userData): Promise<CreateDBUserRow | null> {
    const { email, password, firstName, lastName } = userData;

    const hashedPassword = await hashPassword(password);
    return await createDBUser(db, {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    });
}

/**
 * @throws {Error}
 */
const updateUserPassword = async (userId: number, password: string): Promise<void> => {
    const hashedPassword = await hashPassword(password);
    await updateDBUserPassword(db, {
        id: userId,
        password: hashedPassword
    });
};


export async function generateSessionToken(): Promise<string> {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

export async function generateEmailVerificationToken(): Promise<string> {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

const JWTsignature = new TextEncoder().encode(process.env.ADMIN_SECRET);
const adminSessionCookie = "admin-session";

export async function loginAdmin(password: string): Promise<boolean> {
    if (password != process.env.ADMIN_PASSWORD) {
        return false;
    }

    let token = await new SignJWT()
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("4 week from now")
        .sign(JWTsignature);

    (await cookies()).set(adminSessionCookie, token);

    return true;
}

export async function isAdmin(): Promise<boolean> {
    let token = (await cookies()).get(adminSessionCookie)?.value;

    if (!token) {
        return false;
    }

    try {
        await jwtVerify(token, JWTsignature, {
            algorithms: ["HS256"],
        });

        return true;
    } catch {
        return false;
    }
}

export async function signoutAdmin() {
    (await cookies()).delete(adminSessionCookie);
}


