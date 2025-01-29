import { encodeHexLowerCase } from "@oslojs/encoding";
import {
    createDBSession,
    deleteAllUserSessionsByUserID,
    deleteUserSessionBySessionID, 
    getUserByID,
    getUserSessionBySessionID,
    updateUserSessionExpiresAt
} from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { sha256 } from "@oslojs/crypto/sha2";
import { redirect } from "next/navigation";

const MILLI_TO_DAYS = 1000 * 60 * 60 * 24;

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
    if (Date.now() >= session.expiresAt.getTime() - MILLI_TO_DAYS * 15) {
        const newExpiry = new Date(Date.now() + MILLI_TO_DAYS * 30);
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
        id: encodeHexLowerCase(sha256(new TextEncoder().encode(sessionId)))
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

/**
 * @throws {Error}
 */
export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        // 30 days
        expiresAt: new Date(Date.now() + MILLI_TO_DAYS * 30)
    };
    await createDBSession(db, session);
    return session;
}

export async function authorizeSession(sessionToken: string | undefined) {
    if (!sessionToken) {
        redirect("/login");
    }

    const sessionValidationResult = await validateSessionToken(sessionToken);
    if (!sessionValidationResult.session || !sessionValidationResult.user) {
        redirect("/login");
    }

    const user = await getUserByID(db, {
        id: sessionValidationResult.user.id
    });

    if (!user) {
        await invalidateSession(sessionToken);
        redirect("/login");
    }
    return user;
}