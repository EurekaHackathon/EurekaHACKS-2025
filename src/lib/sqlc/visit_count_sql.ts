import { Sql } from "postgres";

export const incrementVisitsCountQuery = `-- name: IncrementVisitsCount :one
update public.stats
    set value = value + 1
where name = 'visits' returning id, name, value`;

export interface IncrementVisitsCountRow {
    id: number;
    name: string;
    value: number;
}

export async function incrementVisitsCount(sql: Sql): Promise<IncrementVisitsCountRow | null> {
    const rows = await sql.unsafe(incrementVisitsCountQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        name: row[1],
        value: row[2]
    };
}

