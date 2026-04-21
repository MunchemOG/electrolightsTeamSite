-- ========================================================
-- ELECTROLIGHTS 30686 - DB SEED DATA
-- Note: Replace UUIDs with actual auth.users if needed
-- ========================================================

-- Mock Sponsors for Testing UI
INSERT INTO sponsors (name, tier, color_hex, website)
VALUES 
  ('TechCorp Inc', 'Platinum', '#00F0FF', 'https://example.com'),
  ('Local Machining', 'Gold', '#FF5500', 'https://example.com'),
  ('Pizza Place', 'Silver', '#800020', 'https://example.com');

-- Mock Inventory Parts
INSERT INTO inventory_parts (name, vendor, qty, low_stock_threshold, location, unit_cost)
VALUES
  ('REV UltraPlanetary Gearbox Kit', 'REV Robotics', 8, 2, 'Bin A1', 35.00),
  ('goBILDA Yellow Jacket 312RPM', 'goBILDA', 1, 4, 'Bin C4', 39.99),
  ('M4 x 10mm Socket Head Screws (100pk)', 'McMaster', 5, 2, 'Drawer 2', 12.50),
  ('Control Hub', 'REV Robotics', 2, 1, 'Electronics Safe', 300.00);

-- Mock Tasks
INSERT INTO tasks (title, description, status, subteam, deadline)
VALUES
  ('Design Intake Side-Plates', 'CAD the acrylic side plates for V2 intake.', 'in_progress', 'Hardware', NOW() + INTERVAL '3 days'),
  ('Tune FTC Dashboard Odom', 'Update constants for deadwheel odometry.', 'todo', 'Software', NOW() + INTERVAL '1 day'),
  ('Call Machining Sponsor', 'Confirm when CNC parts are ready.', 'completed', 'Outreach', NOW() - INTERVAL '2 days');

-- Mock Calendar Events
INSERT INTO calendar_events (title, type, date, location)
VALUES
  ('League Meet 2', 'Tournament', NOW() + INTERVAL '7 days', 'High School Gym'),
  ('FLL Mentoring Session', 'Outreach', NOW() + INTERVAL '2 days', 'Middle School Room 102'),
  ('Saturday Build', 'Shop', NOW() + INTERVAL '3 days', 'Shop');
