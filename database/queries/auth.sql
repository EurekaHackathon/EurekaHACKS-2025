-- name: CreateDBSession :exec
insert into public.user_sessions (id, user_id, expires_at)
values ($1, $2, $3);

-- name: GetUserSessionBySessionID :one
select * from public.user_sessions where id = $1;

-- name: DeleteUserSessionBySessionID :exec
delete from public.user_sessions where id = $1;

-- name: DeleteAllUserSessionsByUserID :exec
delete from public.user_sessions where user_id = $1;

-- name: UpdateUserSessionExpiresAt :exec
update public.user_sessions set expires_at = $2 where id = $1;

-- name: CreateDBUser :one
insert into public.apps_users (first_name, last_name, email, password)
values ($1, $2, $3, $4)
returning *;

-- name: UpdateDBUserPassword :exec
update public.apps_users set password = $2 where id = $1;