-- name: GetNumberOfRegisteredUsers :one
select count(*) as count from public.app_users;

-- name: GetNumberOfHackerApplications :one
select count(*) as count from public.hackathon_applications;

-- name: GetNumberOfAcceptedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'accepted';

-- name: GetNumberOfRejectedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'rejected';

-- name: GetNumberOfPendingHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'submitted';

-- name: GetApplicationsPaginated :many
select id, first_name, last_name, school, status, created_at from public.hackathon_applications order by id desc limit $1 offset $2;

-- name: GetApplicationById :one
select * from public.hackathon_applications where id = $1 limit 1;