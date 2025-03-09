import { Sql } from "postgres";

export const createUserEventQuery = `-- name: CreateUserEvent :exec
insert into public.events (user_id, name)
    values ($1, $2)`;

export interface CreateUserEventArgs {
    userId: number;
    name: string;
}

export async function createUserEvent(sql: Sql, args: CreateUserEventArgs): Promise<void> {
    await sql.unsafe(createUserEventQuery, [args.userId, args.name]);
}

export const getUserEventQuery = `-- name: GetUserEvent :one
select id, user_id, name, created_at from public.events where user_id = $1 and name = $2`;

export interface GetUserEventArgs {
    userId: number;
    name: string;
}

export interface GetUserEventRow {
    id: number;
    userId: number;
    name: string;
    createdAt: Date;
}

export async function getUserEvent(sql: Sql, args: GetUserEventArgs): Promise<GetUserEventRow | null> {
    const rows = await sql.unsafe(getUserEventQuery, [args.userId, args.name]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        name: row[2],
        createdAt: row[3]
    };
}

