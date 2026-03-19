# the-hive-website
## ⚠️ Pre-Production Security Checklist

- [ ] Delete or demote the development admin test account in Supabase
- [ ] Generate a new JWT_SECRET for production
- [ ] Set NODE_ENV=production on the server
- [ ] Lock CORS to the exact production domain
- [ ] Enable email confirmation in Supabase Auth settings
- [ ] Rotate Supabase service role key after development
- [ ] Ensure .env files are never committed to the repo
- [ ] Set up proper logging and monitoring
- [ ] Enable Supabase database backups
- [ ] Review and tighten RLS policies before launch
