create table if not exists public.stats (
    id serial primary key,
    name text not null unique check (length(name) > 0),
    value integer not null default 0 check (value >= 0)
);

create table if not exists public.mailing_list (
    id serial primary key,
    email text unique not null check (email ~ '^([^@]+)*@([^.@]+\.)+([^.@]+)$')
);

create table if not exists public.apps_users (
    id serial primary key,
    first_name text not null check (
        length(first_name) > 0
        and length(first_name) < 128
    ),
    last_name text not null check (
        length(last_name) > 0
        and length(last_name) < 128
    ),
    email text unique not null check (email ~ '^[^@]+@[^@]+\\.[^@]+$'),
    password text not null check (password ~ '^(?=.*[a-zA-Z])(?=.*\\d).{8,128}$'),
    email_verified boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.user_sessions (
    id text not null primary key,
    user_id integer not null references public.apps_users(id) on delete cascade,
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
)