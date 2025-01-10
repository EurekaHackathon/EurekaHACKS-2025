import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/lib/database";
import {
    createDBSession,
    createDBUser, CreateDBUserRow, deleteAllUserSessionsByUserID,
    deleteUserSessionBySessionID,
    getUserSessionBySessionID, updateDBUserPassword,
    updateUserSessionExpiresAt
} from "@/lib/sqlc/auth_sql";
import { hash } from "@node-rs/argon2";

async function hashPassword(password: string, salt: string): Promise<string> {
    return await hash(password + salt, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
        algorithm: 2,
    });
}

const generateSalt = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
};

/**
 * @throws {Error}
 */
export async function createUser(email: string, password: string, firstName: string, lastName: string): Promise<CreateDBUserRow | null> {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    return await createDBUser(db, {
        email: email,
        password: hashedPassword + salt,
        firstName: firstName,
        lastName: lastName
    });
}

/**
 * @throws {Error}
 */
const updateUserPassword = async (userId: number, password: string): Promise<void> => {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    await updateDBUserPassword(db, {
        id: userId,
        password: hashedPassword + salt
    });
};

export function generateSessionToken(): string {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
}

/**
 * @throws {Error}
 */
export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        // 30 days
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };
    await createDBSession(db, session);
    return session;
}

/**
 * @throws {Error}
 */
export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session = await getUserSessionBySessionID(db, {
        id: sessionId
    });

    if (session === null) {
        return { session: null, user: null };
    }

    const user: User = {
        id: session.userId
    };

    if (Date.now() >= session.expiresAt.getTime()) {
        await deleteUserSessionBySessionID(db, {
            id: sessionId
        });
        return { session: null, user: null };
    }

    // If the session is about to expire, extend the expiry date
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        const newExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await updateUserSessionExpiresAt(db, {
            id: sessionId,
            expiresAt: newExpiry
        });
    }
    return { session, user };
}

/**
 * @throws {Error}
 */
export async function invalidateSession(sessionId: string): Promise<void> {
    await deleteUserSessionBySessionID(db, {
        id: sessionId
    });
}

/**
 * @throws {Error}
 */
export async function invalidateAllSessions(userId: number): Promise<void> {
    await deleteAllUserSessionsByUserID(db, {
        userId: userId
    });
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };


export interface Session {
    id: string;
    userId: number;
    expiresAt: Date;
}

export interface User {
    id: number;
}