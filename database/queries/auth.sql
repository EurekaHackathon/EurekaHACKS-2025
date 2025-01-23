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

-- name: GetUserByEmail :one
select * from public.apps_users where email = $1;

-- name: CreateEmailVerificationToken :one
insert into public.email_verification_tokens (user_id, token, expires_at)
values ($1, $2, $3)
returning *;

-- name: DeleteAllEmailVerificationTokensByUserID :exec
delete from public.email_verification_tokens where user_id = $1;

-- name: GetEmailVerificationTokenByToken :one
select * from public.email_verification_tokens where token = $1;

-- name: GetEmailByVerificationTokenID :one
select email from public.apps_users where id = (select user_id from public.email_verification_tokens where public.email_verification_tokens.id = $1);

-- name: UpdateEmailVerificationToken :one
update public.email_verification_tokens set (token, expires_at) = ($2, $3) where id = $1
returning *;

-- name: VerifyUserEmail :exec
update public.apps_users set email_verified = true where id = $1;