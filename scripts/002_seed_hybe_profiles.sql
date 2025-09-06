-- Insert the provided HYBE user profiles with default password
INSERT INTO hybe_profiles (hybe_id, full_name, email, requires_password_change, is_active, created_at) VALUES
('HYBFFF9012345', 'Haerin Kang', 'haerin.kang@hybe.army', true, true, NOW()),
('B07200EF6667', 'Radhika Verma', 'radhika.verma@hybe.army', true, true, NOW()),
('HYB10250GB0680', 'Elisabete Magalhaes', 'elisabete.magalhaes@hybe.army', true, true, NOW()),
('HYB59371A4C9F2', 'MEGHANA VAISHNAVI', 'meghana.vaishnavi@hybe.army', true, true, NOW());

-- Create a test admin user for profile management
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, role)
VALUES (
  gen_random_uuid(),
  'admin@hybe.army',
  crypt('HYBEARMY2025', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  'authenticated'
);
