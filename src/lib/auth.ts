"use server";

import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { db } from "@/lib/database";
import { createEmailUser, CreateEmailUserRow, updateDBUserPassword } from "@/lib/sqlc/auth_sql";
import { hash } from "@node-rs/argon2";

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
export async function createUser(userData: userData): Promise<CreateEmailUserRow | null> {
    const { email, password, firstName, lastName } = userData;

    const hashedPassword = await hashPassword(password);
    return await createEmailUser(db, {
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
