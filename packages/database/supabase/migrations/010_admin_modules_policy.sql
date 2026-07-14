-- =============================================
-- Migration 010: Admin management policy for modules
-- =============================================
-- modules (added in 003_modules.sql) only ever got a public-select
-- policy. Every sibling table (units, lessons, exercises, domains) has
-- an "Admins can manage" policy — modules was missed, which would block
-- the admin CMS from writing to it.

create policy "Admins can manage modules"
  on public.modules for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));
