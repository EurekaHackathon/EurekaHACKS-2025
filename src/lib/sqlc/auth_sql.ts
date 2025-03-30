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

export const createEmailUserQuery = `-- name: CreateEmailUser :one
insert into public.app_users (first_name, last_name, email, password, account_type)
values ($1, $2, $3, $4, 'email')
returning id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at`;

export interface CreateEmailUserArgs {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
}

export interface CreateEmailUserRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function createEmailUser(sql: Sql, args: CreateEmailUserArgs): Promise<CreateEmailUserRow | null> {
    const rows = await sql.unsafe(createEmailUserQuery, [args.firstName, args.lastName, args.email, args.password]).values();
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const createGithubUserQuery = `-- name: CreateGithubUser :one
insert into public.app_users (first_name, last_name, oauth_id, account_type, email_verified)
values ($1, $2, $3, 'github', true)
returning id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at`;

export interface CreateGithubUserArgs {
    firstName: string | null;
    lastName: string | null;
    oauthId: string | null;
}

export interface CreateGithubUserRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function createGithubUser(sql: Sql, args: CreateGithubUserArgs): Promise<CreateGithubUserRow | null> {
    const rows = await sql.unsafe(createGithubUserQuery, [args.firstName, args.lastName, args.oauthId]).values();
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const createGoogleUserQuery = `-- name: CreateGoogleUser :one
insert into public.app_users (first_name, last_name, oauth_id, account_type, email_verified)
values ($1, $2, $3, 'google', true)
returning id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at`;

export interface CreateGoogleUserArgs {
    firstName: string | null;
    lastName: string | null;
    oauthId: string | null;
}

export interface CreateGoogleUserRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function createGoogleUser(sql: Sql, args: CreateGoogleUserArgs): Promise<CreateGoogleUserRow | null> {
    const rows = await sql.unsafe(createGoogleUserQuery, [args.firstName, args.lastName, args.oauthId]).values();
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const updateDBUserPasswordQuery = `-- name: UpdateDBUserPassword :exec
update public.app_users set password = $2 where id = $1`;

export interface UpdateDBUserPasswordArgs {
    id: number;
    password: string | null;
}

export async function updateDBUserPassword(sql: Sql, args: UpdateDBUserPasswordArgs): Promise<void> {
    await sql.unsafe(updateDBUserPasswordQuery, [args.id, args.password]);
}

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
select id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at from public.app_users where email ILIKE $1 and account_type = 'email'`;

export interface GetUserByEmailArgs {
    email: string | null;
}

export interface GetUserByEmailRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const getUserByGithubIDQuery = `-- name: GetUserByGithubID :one
select id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at from public.app_users where oauth_id = $1 and account_type = 'github'`;

export interface GetUserByGithubIDArgs {
    oauthId: string | null;
}

export interface GetUserByGithubIDRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserByGithubID(sql: Sql, args: GetUserByGithubIDArgs): Promise<GetUserByGithubIDRow | null> {
    const rows = await sql.unsafe(getUserByGithubIDQuery, [args.oauthId]).values();
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const getUserByGoogleIDQuery = `-- name: GetUserByGoogleID :one
select id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at from public.app_users where oauth_id = $1 and account_type = 'google'`;

export interface GetUserByGoogleIDArgs {
    oauthId: string | null;
}

export interface GetUserByGoogleIDRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserByGoogleID(sql: Sql, args: GetUserByGoogleIDArgs): Promise<GetUserByGoogleIDRow | null> {
    const rows = await sql.unsafe(getUserByGoogleIDQuery, [args.oauthId]).values();
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const getUserByIDQuery = `-- name: GetUserByID :one
select id, first_name, last_name, email, password, email_verified, account_type, oauth_id, is_admin, created_at, updated_at from public.app_users where id = $1`;

export interface GetUserByIDArgs {
    id: number;
}

export interface GetUserByIDRow {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    emailVerified: boolean;
    accountType: string;
    oauthId: string | null;
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
        accountType: row[6],
        oauthId: row[7],
        isAdmin: row[8],
        createdAt: row[9],
        updatedAt: row[10]
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
select email from public.app_users where id = (select user_id from public.email_verification_tokens where public.email_verification_tokens.id = $1)`;

export interface GetEmailByVerificationTokenIDArgs {
    id: string;
}

export interface GetEmailByVerificationTokenIDRow {
    email: string | null;
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

export const verifyUserEmailQuery = `-- name: VerifyUserEmail :exec
update public.app_users set email_verified = true where id = $1`;

export interface VerifyUserEmailArgs {
    id: number;
}

export async function verifyUserEmail(sql: Sql, args: VerifyUserEmailArgs): Promise<void> {
    await sql.unsafe(verifyUserEmailQuery, [args.id]);
}

export const changePasswordQuery = `-- name: ChangePassword :exec
update public.app_users set password = $2 where id = $1`;

export interface ChangePasswordArgs {
    id: number;
    password: string | null;
}

export async function changePassword(sql: Sql, args: ChangePasswordArgs): Promise<void> {
    await sql.unsafe(changePasswordQuery, [args.id, args.password]);
}

export const createPasswordResetTokenQuery = `-- name: CreatePasswordResetToken :one
insert into public.password_reset_tokens (user_id, token, expires_at)
values ($1, $2, $3)
returning id, user_id, token, expires_at, created_at, updated_at`;

export interface CreatePasswordResetTokenArgs {
    userId: number;
    token: string;
    expiresAt: Date;
}

export interface CreatePasswordResetTokenRow {
    id: string;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function createPasswordResetToken(sql: Sql, args: CreatePasswordResetTokenArgs): Promise<CreatePasswordResetTokenRow | null> {
    const rows = await sql.unsafe(createPasswordResetTokenQuery, [args.userId, args.token, args.expiresAt]).values();
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

export const getEmailByPasswordResetTokenIDQuery = `-- name: GetEmailByPasswordResetTokenID :one
select email from public.app_users where id = (select user_id from public.password_reset_tokens where public.password_reset_tokens.id = $1)`;

export interface GetEmailByPasswordResetTokenIDArgs {
    id: string;
}

export interface GetEmailByPasswordResetTokenIDRow {
    email: string | null;
}

export async function getEmailByPasswordResetTokenID(sql: Sql, args: GetEmailByPasswordResetTokenIDArgs): Promise<GetEmailByPasswordResetTokenIDRow | null> {
    const rows = await sql.unsafe(getEmailByPasswordResetTokenIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        email: row[0]
    };
}

export const getPasswordResetTokenByTokenQuery = `-- name: GetPasswordResetTokenByToken :one
select id, user_id, token, expires_at, created_at, updated_at from public.password_reset_tokens where token = $1`;

export interface GetPasswordResetTokenByTokenArgs {
    token: string;
}

export interface GetPasswordResetTokenByTokenRow {
    id: string;
    userId: number;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export async function getPasswordResetTokenByToken(sql: Sql, args: GetPasswordResetTokenByTokenArgs): Promise<GetPasswordResetTokenByTokenRow | null> {
    const rows = await sql.unsafe(getPasswordResetTokenByTokenQuery, [args.token]).values();
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

export const deleteAllPasswordResetTokensByUserIDQuery = `-- name: DeleteAllPasswordResetTokensByUserID :exec
delete from public.password_reset_tokens where user_id = $1`;

export interface DeleteAllPasswordResetTokensByUserIDArgs {
    userId: number;
}

export async function deleteAllPasswordResetTokensByUserID(sql: Sql, args: DeleteAllPasswordResetTokensByUserIDArgs): Promise<void> {
    await sql.unsafe(deleteAllPasswordResetTokensByUserIDQuery, [args.userId]);
}

