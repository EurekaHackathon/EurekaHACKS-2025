import { Sql } from "postgres";

export const getNumberOfRegisteredUsersQuery = `-- name: GetNumberOfRegisteredUsers :one
select count(*) as count from public.app_users`;

export interface GetNumberOfRegisteredUsersRow {
    count: string;
}

export async function getNumberOfRegisteredUsers(sql: Sql): Promise<GetNumberOfRegisteredUsersRow | null> {
    const rows = await sql.unsafe(getNumberOfRegisteredUsersQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfHackerApplicationsQuery = `-- name: GetNumberOfHackerApplications :one
select count(*) as count from public.hackathon_applications`;

export interface GetNumberOfHackerApplicationsRow {
    count: string;
}

export async function getNumberOfHackerApplications(sql: Sql): Promise<GetNumberOfHackerApplicationsRow | null> {
    const rows = await sql.unsafe(getNumberOfHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfAcceptedHackerApplicationsQuery = `-- name: GetNumberOfAcceptedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'accepted'`;

export interface GetNumberOfAcceptedHackerApplicationsRow {
    count: string;
}

export async function getNumberOfAcceptedHackerApplications(sql: Sql): Promise<GetNumberOfAcceptedHackerApplicationsRow | null> {
    const rows = await sql.unsafe(getNumberOfAcceptedHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfRejectedHackerApplicationsQuery = `-- name: GetNumberOfRejectedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'rejected'`;

export interface GetNumberOfRejectedHackerApplicationsRow {
    count: string;
}

export async function getNumberOfRejectedHackerApplications(sql: Sql): Promise<GetNumberOfRejectedHackerApplicationsRow | null> {
    const rows = await sql.unsafe(getNumberOfRejectedHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfPendingHackerApplicationsQuery = `-- name: GetNumberOfPendingHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'submitted'`;

export interface GetNumberOfPendingHackerApplicationsRow {
    count: string;
}

export async function getNumberOfPendingHackerApplications(sql: Sql): Promise<GetNumberOfPendingHackerApplicationsRow | null> {
    const rows = await sql.unsafe(getNumberOfPendingHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

