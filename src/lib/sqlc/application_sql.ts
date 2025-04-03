import { Sql } from "postgres";

export const createApplicationQuery = `-- name: CreateApplication :exec
insert into hackathon_applications (
    user_id,
    status,
    first_name,
    last_name,
    email,
    age,
    school,
    year_of_graduation,
    city,
    dietary_restrictions,
    number_of_hackathons_attended,
    github_link,
    linkedin_link,
    portfolio_link,
    resume_link,
    emergency_contact_full_name,
    emergency_contact_phone_number,
    short_answer_response
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15,
    $16,
    $17,
    $18
) returning id, user_id, status, first_name, last_name, email, age, school, year_of_graduation, city, dietary_restrictions, number_of_hackathons_attended, github_link, linkedin_link, portfolio_link, resume_link, emergency_contact_full_name, emergency_contact_phone_number, short_answer_response, created_at, updated_at`;

export interface CreateApplicationArgs {
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
}

export interface CreateApplicationRow {
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

export async function createApplication(sql: Sql, args: CreateApplicationArgs): Promise<void> {
    await sql.unsafe(createApplicationQuery, [args.userId, args.status, args.firstName, args.lastName, args.email, args.age, args.school, args.yearOfGraduation, args.city, args.dietaryRestrictions, args.numberOfHackathonsAttended, args.githubLink, args.linkedinLink, args.portfolioLink, args.resumeLink, args.emergencyContactFullName, args.emergencyContactPhoneNumber, args.shortAnswerResponse]);
}

export const getApplicationStatusQuery = `-- name: GetApplicationStatus :one
select status from hackathon_applications where user_id = $1`;

export interface GetApplicationStatusArgs {
    userId: number;
}

export interface GetApplicationStatusRow {
    status: string;
}

export async function getApplicationStatus(sql: Sql, args: GetApplicationStatusArgs): Promise<GetApplicationStatusRow | null> {
    const rows = await sql.unsafe(getApplicationStatusQuery, [args.userId]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        status: row[0]
    };
}

export const updateApplicationStatusQuery = `-- name: UpdateApplicationStatus :exec
update hackathon_applications set status = $2 where id = $1`;

export interface UpdateApplicationStatusArgs {
    id: number;
    status: string;
}

export async function updateApplicationStatus(sql: Sql, args: UpdateApplicationStatusArgs): Promise<void> {
    await sql.unsafe(updateApplicationStatusQuery, [args.id, args.status]);
}

export const rsvpUserQuery = `-- name: RsvpUser :exec
insert into rsvps (user_id) values ($1)`;

export interface RsvpUserArgs {
    userId: number;
}

export async function rsvpUser(sql: Sql, args: RsvpUserArgs): Promise<void> {
    await sql.unsafe(rsvpUserQuery, [args.userId]);
}

export const cancelRsvpQuery = `-- name: CancelRsvp :exec
delete from rsvps where user_id = $1`;

export interface CancelRsvpArgs {
    userId: number;
}

export async function cancelRsvp(sql: Sql, args: CancelRsvpArgs): Promise<void> {
    await sql.unsafe(cancelRsvpQuery, [args.userId]);
}

export const getRsvpCountQuery = `-- name: GetRsvpCount :one
select count(*) from rsvps`;

export interface GetRsvpCountRow {
    count: string;
}

export async function getRsvpCount(sql: Sql): Promise<GetRsvpCountRow | null> {
    const rows = await sql.unsafe(getRsvpCountQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getRsvpStatusQuery = `-- name: GetRsvpStatus :one
select id, user_id, created_at from rsvps where user_id = $1 limit 1`;

export interface GetRsvpStatusArgs {
    userId: number;
}

export interface GetRsvpStatusRow {
    id: number;
    userId: number;
    createdAt: Date;
}

export async function getRsvpStatus(sql: Sql, args: GetRsvpStatusArgs): Promise<GetRsvpStatusRow | null> {
    const rows = await sql.unsafe(getRsvpStatusQuery, [args.userId]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        createdAt: row[2]
    };
}

export const getAllAcceptedApplicationsQuery = `-- name: GetAllAcceptedApplications :many
select id, user_id, status, first_name, last_name, email, age, school, year_of_graduation, city, dietary_restrictions, number_of_hackathons_attended, github_link, linkedin_link, portfolio_link, resume_link, emergency_contact_full_name, emergency_contact_phone_number, short_answer_response, created_at, updated_at from hackathon_applications where status = 'accepted'`;

export interface GetAllAcceptedApplicationsRow {
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

export async function getAllAcceptedApplications(sql: Sql): Promise<GetAllAcceptedApplicationsRow[]> {
    return (await sql.unsafe(getAllAcceptedApplicationsQuery, []).values()).map(row => ({
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
    }));
}

export const createDecisionEmailRecordQuery = `-- name: CreateDecisionEmailRecord :exec
insert into sent_decision_emails (user_id, status) values ($1, $2)`;

export interface CreateDecisionEmailRecordArgs {
    userId: number;
    status: string;
}

export async function createDecisionEmailRecord(sql: Sql, args: CreateDecisionEmailRecordArgs): Promise<void> {
    await sql.unsafe(createDecisionEmailRecordQuery, [args.userId, args.status]);
}

export const getAllSentDecisionEmailsQuery = `-- name: GetAllSentDecisionEmails :many
select id, user_id, status, created_at from sent_decision_emails`;

export interface GetAllSentDecisionEmailsRow {
    id: number;
    userId: number;
    status: string;
    createdAt: Date;
}

export async function getAllSentDecisionEmails(sql: Sql): Promise<GetAllSentDecisionEmailsRow[]> {
    return (await sql.unsafe(getAllSentDecisionEmailsQuery, []).values()).map(row => ({
        id: row[0],
        userId: row[1],
        status: row[2],
        createdAt: row[3]
    }));
}

