import { Sql } from "postgres";

export const checkIfSubscribedQuery = `-- name: CheckIfSubscribed :one
select id, email from public.mailing_list
    where email = $1
    limit 1`;

export interface CheckIfSubscribedArgs {
    email: string;
}

export interface CheckIfSubscribedRow {
    id: number;
    email: string;
}

export async function getSubscribedEmail(sql: Sql, args: CheckIfSubscribedArgs): Promise<CheckIfSubscribedRow | null> {
    const rows = await sql.unsafe(checkIfSubscribedQuery, [args.email]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1]
    };
}

export const addEmailToMailingListQuery = `-- name: AddEmailToMailingList :one
insert into public.mailing_list (email)
    values ($1)
    returning id, email`;

export interface AddEmailToMailingListArgs {
    email: string;
}

export interface AddEmailToMailingListRow {
    id: number;
    email: string;
}

export async function addEmailToMailingList(sql: Sql, args: AddEmailToMailingListArgs): Promise<AddEmailToMailingListRow | null> {
    const rows = await sql.unsafe(addEmailToMailingListQuery, [args.email]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1]
    };
}

