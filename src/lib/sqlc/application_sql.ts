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

