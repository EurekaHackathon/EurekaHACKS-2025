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
returning id, first_name, last_name, email, password, email_verified, created_at, updated_at`;

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
        createdAt: row[6],
        updatedAt: row[7]
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
select id, first_name, last_name, email, password, email_verified, created_at, updated_at from public.apps_users where email = $1`;

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
        createdAt: row[6],
        updatedAt: row[7]
    };
}

