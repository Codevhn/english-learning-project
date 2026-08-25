-- =============================================
-- Migration 013: Close privilege escalation on profiles.is_admin
-- =============================================
-- The policy "Users can update their own profile" (001) allowed any
-- authenticated user to UPDATE ANY COLUMN of their own profile row,
-- including is_admin. Via the Supabase REST API a user could promote
-- themselves to admin and gain full write access to every content
-- table (courses, units, lessons, exercises, domains, vocabulary).
--
-- Fix: replace the blanket update policy with one that blocks changes
-- to the protected columns (is_admin). Users keep editing their own
-- display_name / avatar_url / language prefs.

drop policy "Users can update their own profile"
  on public.profiles;

create policy "Users can update their own profile (not is_admin)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and is_admin = (select p.is_admin from public.profiles p where p.id = auth.uid())
  );

-- Defense in depth: even if a future policy or service key write tries
-- to flip is_admin outside a deliberate grant, this trigger rejects it.
create or replace function public.protect_is_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Block only end-user sessions (PostgREST runs them as role
  -- 'authenticated'). Service-role / dashboard writes run as postgres
  -- or service_role, which we allow for admin provisioning.
  if auth.role() = 'authenticated' then
    if new.is_admin is distinct from old.is_admin then
      raise exception 'is_admin cannot be modified directly';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_is_admin on public.profiles;
create trigger trg_protect_is_admin
  before update on public.profiles
  for each row execute procedure public.protect_is_admin();

comment on column public.profiles.is_admin is
  'Admin flag. Only modifiable via service role; blocked to end users by policy 013.';
