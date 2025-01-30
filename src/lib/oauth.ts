import { GitHub } from "arctic";

export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID ?? "",
    process.env.GITHUB_CLIENT_SECRET ?? "",
    process.env.DEV === "true" ? "http://localhost:3000/login/github/callback" : "https://eurekahacks.ca/login/github/callback"
);