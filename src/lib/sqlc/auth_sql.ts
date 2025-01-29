import { Sql } from "postgres";

export const createDBSessionQuery = `-- name: CreateDBSession :exec
insert into public.user_sessions (id, user_id, expires_at)
values ($1, $2, $3)`;

export interface CreateDBSessionArgs {
    id: string;
    userId: number;
    expiresAt: Date;
}

export async function createDBSession(sql: Sql, args: CreateDBSessionArgs): Promise<void> {
    await sql.unsafe(createDBSessionQuery, [args.id, args.userId, args.expiresAt]);
}

export const getUserSessionBySessionIDQuery = `-- name: GetUserSessionBySessionID :one
select id, user_id, expires_at, created_at, updated_at from public.user_sessions where id = $1`;

export interface GetUserSessionBySessionIDArgs {
    id: string;
}

export interface GetUserSessionBySessionIDRow {
    id: string;
    userId: number;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserSessionBySessionID(sql: Sql, args: GetUserSessionBySessionIDArgs): Promise<GetUserSessionBySessionIDRow | null> {
    const rows = await sql.unsafe(getUserSessionBySessionIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        expiresAt: row[2],
        createdAt: row[3],
        updatedAt: row[4]
    };
}

export const deleteUserSessionBySessionIDQuery = `-- name: DeleteUserSessionBySessionID :exec
delete from public.user_sessions where id = $1`;

export interface DeleteUserSessionBySessionIDArgs {
    id: string;
}

export async function deleteUserSessionBySessionID(sql: Sql, args: DeleteUserSessionBySessionIDArgs): Promise<void> {
    await sql.unsafe(deleteUserSessionBySessionIDQuery, [args.id]);
}

export const deleteAllUserSessionsByUserIDQuery = `-- name: DeleteAllUserSessionsByUserID :exec
delete from public.user_sessions where user_id = $1`;

export interface DeleteAllUserSessionsByUserIDArgs {
    userId: number;
}

export async function deleteAllUserSessionsByUserID(sql: Sql, args: DeleteAllUserSessionsByUserIDArgs): Promise<void> {
    await sql.unsafe(deleteAllUserSessionsByUserIDQuery, [args.userId]);
}

export const updateUserSessionExpiresAtQuery = `-- name: UpdateUserSessionExpiresAt :exec
update public.user_sessions set expires_at = $2 where id = $1`;

export interface UpdateUserSessionExpiresAtArgs {
    id: string;
    expiresAt: Date;
}

export async function updateUserSessionExpiresAt(sql: Sql, args: UpdateUserSessionExpiresAtArgs): Promise<void> {
    await sql.unsafe(updateUserSessionExpiresAtQuery, [args.id, args.expiresAt]);
}

export const createDBUserQuery = `-- name: CreateDBUser :one
insert into public.apps_users (first_name, last_name, email, password)
values ($1, $2, $3, $4)
returning id, first_name, last_name, email, password, email_verified, is_admin, created_at, updated_at`;

export interface CreateDBUserArgs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CreateDBUserRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function createDBUser(sql: Sql, args: CreateDBUserArgs): Promise<CreateDBUserRow | null> {
    const rows = await sql.unsafe(createDBUserQuery, [args.firstName, args.lastName, args.email, args.password]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        email: row[3],
        password: row[4],
        emailVerified: row[5],
        isAdmin: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

export const updateDBUserPasswordQuery = `-- name: UpdateDBUserPassword :exec
update public.apps_users set password = $2 where id = $1`;

export interface UpdateDBUserPasswordArgs {
    id: number;
    password: string;
}

export async function updateDBUserPassword(sql: Sql, args: UpdateDBUserPasswordArgs): Promise<void> {
    await sql.unsafe(updateDBUserPasswordQuery, [args.id, args.password]);
}

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
select id, first_name, last_name, email, password, email_verified, is_admin, created_at, updated_at from public.apps_users where email = $1`;

export interface GetUserByEmailArgs {
    email: string;
}

export interface GetUserByEmailRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserByEmail(sql: Sql, args: GetUserByEmailArgs): Promise<GetUserByEmailRow | null> {
    const rows = await sql.unsafe(getUserByEmailQuery, [args.email]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        email: row[3],
        password: row[4],
        emailVerified: row[5],
        isAdmin: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

export const getUserByIDQuery = `-- name: GetUserByID :one
select id, first_name, last_name, email, password, email_verified, is_admin, created_at, updated_at from public.apps_users where id = $1`;

export interface GetUserByIDArgs {
    id: number;
}

export interface GetUserByIDRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserByID(sql: Sql, args: GetUserByIDArgs): Promise<GetUserByIDRow | null> {
    const rows = await sql.unsafe(getUserByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        email: row[3],
        password: row[4],
        emailVerified: row[5],
        isAdmin: row[6],
        createdAt: row[7],
        updatedAt: row[8]
    };
}

export const createEmailVerificationTokenQuery = `-- name: CreateEmailVerificationToken :one
insert into public.email_verification_tokens (user_id, token, expires_at)
values ($1, $2, $3)
returning id, user_id, token, expires_at, created_at, updated_at`;

export interface CreateEmailVerificationTokenArgs {
    userId: number;
    token: string;
    expiresAt: Date;
}

export interface CreateEmailVerificationTokenRow {
    id: string;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function createEmailVerificationToken(sql: Sql, args: CreateEmailVerificationTokenArgs): Promise<CreateEmailVerificationTokenRow | null> {
    const rows = await sql.unsafe(createEmailVerificationTokenQuery, [args.userId, args.token, args.expiresAt]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        token: row[2],
        expiresAt: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const deleteAllEmailVerificationTokensByUserIDQuery = `-- name: DeleteAllEmailVerificationTokensByUserID :exec
delete from public.email_verification_tokens where user_id = $1`;

export interface DeleteAllEmailVerificationTokensByUserIDArgs {
    userId: number;
}

export async function deleteAllEmailVerificationTokensByUserID(sql: Sql, args: DeleteAllEmailVerificationTokensByUserIDArgs): Promise<void> {
    await sql.unsafe(deleteAllEmailVerificationTokensByUserIDQuery, [args.userId]);
}

export const getEmailVerificationTokenByTokenQuery = `-- name: GetEmailVerificationTokenByToken :one
select id, user_id, token, expires_at, created_at, updated_at from public.email_verification_tokens where token = $1`;

export interface GetEmailVerificationTokenByTokenArgs {
    token: string;
}

export interface GetEmailVerificationTokenByTokenRow {
    id: string;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function getEmailVerificationTokenByToken(sql: Sql, args: GetEmailVerificationTokenByTokenArgs): Promise<GetEmailVerificationTokenByTokenRow | null> {
    const rows = await sql.unsafe(getEmailVerificationTokenByTokenQuery, [args.token]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        token: row[2],
        expiresAt: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getEmailByVerificationTokenIDQuery = `-- name: GetEmailByVerificationTokenID :one
select email from public.apps_users where id = (select user_id from public.email_verification_tokens where public.email_verification_tokens.id = $1)`;

export interface GetEmailByVerificationTokenIDArgs {
    id: string;
}

export interface GetEmailByVerificationTokenIDRow {
    email: string;
}

export async function getEmailByVerificationTokenID(sql: Sql, args: GetEmailByVerificationTokenIDArgs): Promise<GetEmailByVerificationTokenIDRow | null> {
    const rows = await sql.unsafe(getEmailByVerificationTokenIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        email: row[0]
    };
}

export const updateEmailVerificationTokenQuery = `-- name: UpdateEmailVerificationToken :one
update public.email_verification_tokens set (token, expires_at) = ($2, $3) where id = $1
returning id, user_id, token, expires_at, created_at, updated_at`;

export interface UpdateEmailVerificationTokenArgs {
    id: string;
    token: string;
    expiresAt: Date;
}

export interface UpdateEmailVerificationTokenRow {
    id: string;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function updateEmailVerificationToken(sql: Sql, args: UpdateEmailVerificationTokenArgs): Promise<UpdateEmailVerificationTokenRow | null> {
    const rows = await sql.unsafe(updateEmailVerificationTokenQuery, [args.id, args.token, args.expiresAt]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        token: row[2],
        expiresAt: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const verifyUserEmailQuery = `-- name: VerifyUserEmail :exec
update public.apps_users set email_verified = true where id = $1`;

export interface VerifyUserEmailArgs {
    id: number;
}

export async function verifyUserEmail(sql: Sql, args: VerifyUserEmailArgs): Promise<void> {
    await sql.unsafe(verifyUserEmailQuery, [args.id]);
}

