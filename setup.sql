-- Create the activities table
create table activities (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    url text not null,
    votes integer default 0,
    thumbnail text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table activities enable row level security;

-- Allow anonymous access for now (we can add auth later if needed)
create policy "Allow anonymous access to activities"
on activities for all
to anon
using (true)
with check (true);
