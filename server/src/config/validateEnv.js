const required = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
  'JWT_SECRET',
  'CLIENT_URL',
  'PORT',
];

export function validateEnv() {
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nAdd them to your .env file and restart the server.');
    process.exit(1);
  }

  if (process.env.JWT_SECRET === 'changeme_use_a_long_random_string_in_production') {
    console.error('❌ JWT_SECRET is still set to the default placeholder. Generate a secure secret.');
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET is too short. Use at least 32 characters.');
    process.exit(1);
  }

  console.log('✅ Environment variables validated');
}
