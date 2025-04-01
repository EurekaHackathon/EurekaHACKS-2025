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
select ha.id,
       ha.first_name,
       ha.last_name,
       ha.school,
       ha.status,
       ha.created_at,
       exists(
           select 1
           from public.rsvps r
           where r.user_id = ha.user_id
       ) as rsvped
from public.hackathon_applications ha
where lower(ha.first_name) like lower('%' || sqlc.arg(search_query) || '%')
   or lower(ha.last_name) like lower('%' || sqlc.arg(search_query) || '%')
order by ha.id desc
limit $1 offset $2;

-- name: GetNumberOfApplicationsFiltered :one
select count(*)
from public.hackathon_applications
where lower(first_name) like lower('%' || sqlc.arg(search_query) || '%')
   or lower(last_name) like lower('%' || sqlc.arg(search_query) || '%');

-- name: GetApplicationById :one
select ha.*,
       exists(
           select 1
           from public.rsvps r
           where r.user_id = ha.user_id
       ) as rsvped
from public.hackathon_applications ha
where ha.id = $1
limit 1;

-- name: GetApplicationCountPerDay :many
select date(created_at at time zone 'America/Toronto') as date, count(*) as count
from public.hackathon_applications
group by date(created_at at time zone 'America/Toronto')
order by date(created_at at time zone 'America/Toronto') asc;

-- name: GetNumberOfApplicationsPerSchool :many
select school, count(*) as count
from public.hackathon_applications
group by school
order by count desc;

-- name: GetEmailsOfUnappliedUsers :many
select email from public.app_users where email not in (select email from public.hackathon_applications);

-- name: GetBasicUserInfoByUserId :one
select id, first_name, last_name, email from public.hackathon_applications where user_id = $1;