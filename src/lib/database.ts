import postgres from "postgres";

export const db = postgres(process.env.DATABASE_URL || "", {
    idle_timeout: 20,
});