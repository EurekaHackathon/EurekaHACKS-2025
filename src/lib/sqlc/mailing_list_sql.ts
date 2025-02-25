import { Sql } from "postgres";

export const getSubscribedEmailQuery = `-- name: GetSubscribedEmail :one
select id, email from public.mailing_list
    where email = $1
    limit 1`;

export interface GetSubscribedEmailArgs {
    email: string;
}

export interface GetSubscribedEmailRow {
    id: string;
    email: string;
}

export async function getSubscribedEmail(sql: Sql, args: GetSubscribedEmailArgs): Promise<GetSubscribedEmailRow | null> {
    const rows = await sql.unsafe(getSubscribedEmailQuery, [args.email]).values();
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
    id: string;
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

export const removeEmailFromMailingListQuery = `-- name: RemoveEmailFromMailingList :one
delete from public.mailing_list
    where id = $1
    returning id, email`;

export interface RemoveEmailFromMailingListArgs {
    id: string;
}

export interface RemoveEmailFromMailingListRow {
    id: string;
    email: string;
}

export async function removeEmailFromMailingList(sql: Sql, args: RemoveEmailFromMailingListArgs): Promise<RemoveEmailFromMailingListRow | null> {
    const rows = await sql.unsafe(removeEmailFromMailingListQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        email: row[1]
    };
}

export const getAllEmailsFromMailingListQuery = `-- name: GetAllEmailsFromMailingList :many
select id, email from public.mailing_list`;

export interface GetAllEmailsFromMailingListRow {
    id: string;
    email: string;
}

export async function getAllEmailsFromMailingList(sql: Sql): Promise<GetAllEmailsFromMailingListRow[]> {
    return (await sql.unsafe(getAllEmailsFromMailingListQuery, []).values()).map(row => ({
        id: row[0],
        email: row[1]
    }));
}

