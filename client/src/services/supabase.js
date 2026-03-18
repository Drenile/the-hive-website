import { createClient } from '@supabase/supabase-js';

// Publishable key only — safe for frontend
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
