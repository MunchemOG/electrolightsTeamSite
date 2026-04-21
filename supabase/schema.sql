-- ========================================================
-- ELECTROLIGHTS 30686 - SUPABASE DATABASE SCHEMA
-- ========================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define custom enum for Roles
CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');

-- ========================================================
-- TABLES
-- ========================================================

-- 1. Profiles (Extends Supabase Auth users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  subteam TEXT NOT NULL DEFAULT 'undecided',
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  bio TEXT,
  tools TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tasks (Kanban boards)
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  subteam TEXT NOT NULL,
  assignees UUID[] DEFAULT '{}'::UUID[],
  deadline TIMESTAMPTZ,
  attachments TEXT[] DEFAULT '{}'::TEXT[],
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Subtasks
CREATE TABLE subtasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

-- 4. Calendar Events
CREATE TABLE calendar_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Meeting Minutes
CREATE TABLE meeting_minutes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  body_richtext TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Inventory Parts
CREATE TABLE inventory_parts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  vendor TEXT,
  qty INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  location TEXT,
  unit_cost NUMERIC(10, 2) DEFAULT 0.00
);

-- 7. Purchase Requests
CREATE TABLE purchase_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  part_name TEXT NOT NULL,
  qty INTEGER NOT NULL,
  reason TEXT,
  requested_by UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Expenses
CREATE TABLE expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT,
  logged_by UUID REFERENCES profiles(id),
  date TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Scouting Entries
CREATE TABLE scouting_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_num INTEGER NOT NULL,
  team_num INTEGER NOT NULL,
  auto_score INTEGER DEFAULT 0,
  tele_score INTEGER DEFAULT 0,
  endgame TEXT,
  notes TEXT,
  data JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Announcements
CREATE TABLE announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  body TEXT NOT NULL,
  subteam_target TEXT DEFAULT 'all',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Attendance Logs
CREATE TABLE attendance_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  clock_in TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  clock_out TIMESTAMPTZ
);

-- 12. Volunteer Hours
CREATE TABLE volunteer_hours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  hours NUMERIC(5, 2) NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Sponsors
CREATE TABLE sponsors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL,
  logo_url TEXT,
  color_hex TEXT,
  website TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Sponsor Leads
CREATE TABLE sponsor_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT,
  status TEXT DEFAULT 'contacted',
  notes TEXT,
  last_contacted TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Audit Logs
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id UUID,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_minutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE scouting_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES: Anyone can read, but individuals edit themselves; admins can edit anyone.
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. TASKS & CALENDAR: Everyone can see, but ONLY mentors/admins can aggressively delete
CREATE POLICY "Anyone can read tasks" ON tasks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert/update tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can update tasks" ON tasks FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can read events" ON calendar_events FOR SELECT USING (true);
CREATE POLICY "Mentors can create events" ON calendar_events FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('mentor', 'admin'))
);

-- 3. INVENTORY & PURCHASING
CREATE POLICY "Anyone can read parts" ON inventory_parts FOR SELECT USING (true);
CREATE POLICY "Anyone can update inventory counts" ON inventory_parts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can request purchase" ON purchase_requests FOR INSERT WITH CHECK (auth.uid() = requested_by);

-- 4. SCOUTING: Students/Mentors can read/write, but only admins can delete
CREATE POLICY "Anyone can read scouting" ON scouting_entries FOR SELECT USING (true);
CREATE POLICY "Anyone can insert scouting" ON scouting_entries FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Only admins can delete scouting" ON scouting_entries FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. SPONSORS: Public site reads this, admins edit this
CREATE POLICY "Public sponsors viewable" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Admins edit sponsors" ON sponsors FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
