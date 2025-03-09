-- name: CreateUserEvent :exec
insert into public.events (user_id, name)
    values ($1, $2);

-- name: GetUserEvent :one
select * from public.events where user_id = $1 and name = $2;