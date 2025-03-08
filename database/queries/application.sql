-- name: CreateApplication :exec
insert into hackathon_applications (
    user_id,
    status,
    first_name,
    last_name,
    email,
    age,
    school,
    year_of_graduation,
    city,
    dietary_restrictions,
    number_of_hackathons_attended,
    github_link,
    linkedin_link,
    portfolio_link,
    resume_link,
    emergency_contact_full_name,
    emergency_contact_phone_number,
    short_answer_response
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14,
    $15,
    $16,
    $17,
    $18
) returning *;

-- name: GetApplicationStatus :one
select status from hackathon_applications where user_id = $1;

-- name: UpdateApplicationStatus :exec
update hackathon_applications set status = $2 where id = $1;