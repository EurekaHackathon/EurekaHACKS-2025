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

export const getApplicationsPaginatedQuery = `-- name: GetApplicationsPaginated :many
select id, first_name, last_name, school, status, created_at from public.hackathon_applications order by id desc limit $1 offset $2`;

export interface GetApplicationsPaginatedArgs {
    limit: string;
    offset: string;
}

export interface GetApplicationsPaginatedRow {
    id: number;
    firstName: string;
    lastName: string;
    school: string;
    status: string;
    createdAt: Date;
}

export async function getApplicationsPaginated(sql: Sql, args: GetApplicationsPaginatedArgs): Promise<GetApplicationsPaginatedRow[]> {
    return (await sql.unsafe(getApplicationsPaginatedQuery, [args.limit, args.offset]).values()).map(row => ({
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        school: row[3],
        status: row[4],
        createdAt: row[5]
    }));
}

export const getApplicationByIdQuery = `-- name: GetApplicationById :one
select id, user_id, status, first_name, last_name, email, age, school, year_of_graduation, city, dietary_restrictions, number_of_hackathons_attended, github_link, linkedin_link, portfolio_link, resume_link, emergency_contact_full_name, emergency_contact_phone_number, short_answer_response, created_at, updated_at from public.hackathon_applications where id = $1 limit 1`;

export interface GetApplicationByIdArgs {
    id: number;
}

export interface GetApplicationByIdRow {
    id: number;
    userId: number;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    school: string;
    yearOfGraduation: number;
    city: string;
    dietaryRestrictions: string[] | null;
    numberOfHackathonsAttended: number;
    githubLink: string | null;
    linkedinLink: string | null;
    portfolioLink: string | null;
    resumeLink: string | null;
    emergencyContactFullName: string;
    emergencyContactPhoneNumber: string;
    shortAnswerResponse: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getApplicationById(sql: Sql, args: GetApplicationByIdArgs): Promise<GetApplicationByIdRow | null> {
    const rows = await sql.unsafe(getApplicationByIdQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        status: row[2],
        firstName: row[3],
        lastName: row[4],
        email: row[5],
        age: row[6],
        school: row[7],
        yearOfGraduation: row[8],
        city: row[9],
        dietaryRestrictions: row[10],
        numberOfHackathonsAttended: row[11],
        githubLink: row[12],
        linkedinLink: row[13],
        portfolioLink: row[14],
        resumeLink: row[15],
        emergencyContactFullName: row[16],
        emergencyContactPhoneNumber: row[17],
        shortAnswerResponse: row[18],
        createdAt: row[19],
        updatedAt: row[20]
    };
}

