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

-- name: GetApplicationCountPerDay :many
select date(created_at at time zone 'America/Toronto') as date, count(*) as count
from public.hackathon_applications
group by date(created_at at time zone 'America/Toronto')
order by date(created_at at time zone 'America/Toronto') asc;

-- name: GetEmailsOfUnappliedUsers :many
select email from public.app_users where email not in (select email from public.hackathon_applications);