-- SQL Script: Seed Demo Data for Pravah Holidays
-- Note: These must be run in the Supabase SQL Editor AFTER the initial schema is set up.

-- 1. Create Demo Profiles (For local simulation or if identities already exist in auth.users)
-- Tip: If you need to add real auth users, do so through the Supabase Authentication dashboard first, 
-- then copy their UUIDs here to assign roles.

/* 
INSERT INTO public.profiles (id, email, full_name, role)
VALUES 
  ('REPLACE-WITH-ADMIN-UUID', 'admin@pravah.com', 'System Administrator', 'admin'),
  ('REPLACE-WITH-USER-UUID', 'user@pravah.com', 'Alex Explorer', 'user');
*/

-- 2. Seed Example Tours
INSERT INTO public.tours (title, price, duration, slots, available_slots, images, description, itinerary)
VALUES 
  (
    'Majestic Leh-Ladakh Expedition', 
    65000, 
    '9 Days', 
    12, 
    8, 
    '{"https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1600&q=90"}',
    'A high-altitude journey through the land of high passes, ancient monasteries, and azure lakes.',
    '[{"day": 1, "activity": "Arrival in Leh & Acclimatization"}, {"day": 2, "activity": "Leh Sightseeing"}, {"day": 3, "activity": "Leh to Nubra Valley via Khardung La"}]'
  ),
  (
    'Munnar Tea Garden Flow', 
    30000, 
    '5 Days', 
    12, 
    12, 
    '{"https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=90"}',
    'Experience the cascading green hills and serene backwaters of Gods Own Country.',
    '[{"day": 1, "activity": "Arrival in Kochi & Drive to Munnar"}, {"day": 2, "activity": "Tea Garden Tour & Museum"}]'
  );

-- 3. Success Message
-- Data seeded successfully. You can now use the bypass login on the frontend for immediate testing.
