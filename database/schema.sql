create table if not exists public.mailing_list (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null
);

create table if not exists public.app_users (
    id serial primary key,
    first_name text,
    last_name text,
    email text unique,
    password text check (password ~ '(?=.*\d)(?=.*[A-Za-z]).{8,128}$'),
    email_verified boolean not null default false,
    account_type text not null check (
        account_type = 'email'
        or account_type = 'github'
        or account_type = 'google'
    ),
    oauth_id text unique,
    is_admin boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.user_sessions (
    id text not null primary key,
    user_id integer not null references public.app_users(id) on delete cascade,
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.email_verification_tokens (
    id uuid primary key default uuid_generate_v4(),
    user_id integer not null references public.app_users(id) on delete cascade,
    token text not null,
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.hackathon_applications (
    id serial primary key,
    user_id integer not null references public.app_users(id) on delete cascade,
    status text not null check (
        status = 'unsubmitted'
        or status = 'submitted'
        or status = 'rejected'
        or status = 'accepted'
        or status = 'waitlisted'
    ),
    first_name text not null check (
        length(first_name) > 0
        and length(first_name) < 128
    ),
    last_name text not null check (
        length(last_name) > 0
        and length(last_name) < 128
    ),
    email text not null,
    age integer not null check (age > 0 and age < 150),
    school text not null check (
        length(school) > 0
        and length(school) < 256
    ),
    year_of_graduation integer not null check (year_of_graduation > 1900 and year_of_graduation < 2100),
    city text not null,
    dietary_restrictions text[],
    number_of_hackathons_attended integer not null check (number_of_hackathons_attended >= 0),
    github_link text,
    linkedin_link text,
    portfolio_link text,
    resume_link text,
    emergency_contact_full_name text not null check (
        length(emergency_contact_full_name) > 0
        and length(emergency_contact_full_name) < 256
    ),
    emergency_contact_phone_number text not null check (
        length(emergency_contact_phone_number) > 0
        and length(emergency_contact_phone_number) < 128
    ),
    short_answer_response text not null check (
        length(short_answer_response) > 0
        and length(short_answer_response) < 1024
    ),

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.events (
    id serial primary key,
    user_id integer not null references public.app_users(id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
    id serial primary key,
    user_id integer not null references public.app_users(id) on delete cascade,
    created_at timestamptz not null default now()
);