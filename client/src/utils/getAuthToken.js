// Shared utility to get the current user's JWT token
import supabase from '../services/supabase';

export const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};
