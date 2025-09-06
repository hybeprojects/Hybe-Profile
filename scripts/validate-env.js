#!/usr/bin/env node
const required = {
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase project URL (NEXT_PUBLIC_SUPABASE_URL)',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY)',
  SMTP_HOST: 'SMTP host (SMTP_HOST)',
  SMTP_PORT: 'SMTP port (SMTP_PORT)',
  SMTP_USER: 'SMTP username (SMTP_USER)',
  SMTP_PASS: 'SMTP password (SMTP_PASS)'
}

const missing = Object.keys(required).filter((k) => !process.env[k])

if (missing.length) {
  console.error('\nMissing required environment variables:\n')
  missing.forEach((k) => console.error(` - ${k}: ${required[k]}`))
  console.error('\nFor local development, copy .env.example to .env.local and fill values.\n')
  process.exit(1)
}

console.log('All required environment variables are present.')
