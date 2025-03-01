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