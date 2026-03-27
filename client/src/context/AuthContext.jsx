import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import supabase from '../services/supabase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (session) => {
    if (!session) { setProfile(null); return; }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/profiles/me`,
        { headers: { Authorization: `Bearer ${session.access_token}` } }
      );
      if (res.status === 401) {
        // Token expired or invalid — sign out
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        return;
      }
      if (res.ok) {
        const { data } = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      fetchProfile(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Handle token refresh failure
        if (event === 'TOKEN_REFRESHED' && !session) {
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        setUser(session?.user ?? null);
        await fetchProfile(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { data, error };
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const isAdmin   = profile?.role === 'admin';
  const isMentor  = profile?.role === 'mentor';
  const isPartner = profile?.role === 'partner';
  const isMember  = !!profile;

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      signUp, signIn, signOut,
      isAdmin, isMentor, isPartner, isMember,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
