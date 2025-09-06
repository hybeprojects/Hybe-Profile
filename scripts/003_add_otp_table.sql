-- Added OTP codes table for email verification
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hybe_id TEXT NOT NULL REFERENCES admin_profiles(hybe_id),
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_otp_codes_hybe_id ON otp_codes(hybe_id);
CREATE INDEX IF NOT EXISTS idx_otp_codes_code ON otp_codes(code);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);

-- Add email column to admin_profiles if not exists
ALTER TABLE admin_profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Update existing profiles with email addresses
UPDATE admin_profiles SET email = 'haerin.kang@hybe.co.kr' WHERE hybe_id = 'HYBFFF9012345';
UPDATE admin_profiles SET email = 'radhika.verma@hybe.co.kr' WHERE hybe_id = 'B07200EF6667';
UPDATE admin_profiles SET email = 'elisabete.magalhaes@hybe.co.kr' WHERE hybe_id = 'HYB10250GB0680';
UPDATE admin_profiles SET email = 'meghana.vaishnavi@hybe.co.kr' WHERE hybe_id = 'HYB59371A4C9F2';
