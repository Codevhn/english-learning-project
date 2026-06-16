-- Allow authenticated users to view any user's stats (needed for leaderboard)
create policy "Authenticated users can view all stats"
  on public.user_stats for select
  using (auth.role() = 'authenticated');

-- Allow authenticated users to view any user's public profile (needed for leaderboard)
create policy "Authenticated users can view all profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');
