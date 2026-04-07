import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../services/supabase';
import styles from './SessionWarning.module.css';

function SessionWarning() {
  const { user, signOut } = useAuth();
  const navigate          = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft]       = useState(0);

  useEffect(() => {
    if (!user) { setShowWarning(false); return; }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setShowWarning(false); return; }

      const expiresAt  = session.expires_at * 1000; // convert to ms
      const now        = Date.now();
      const remaining  = expiresAt - now;
      const fiveMin    = 5 * 60 * 1000;

      if (remaining <= 0) {
        // Token already expired — sign out
        await signOut();
        navigate('/login');
        return;
      }

      if (remaining <= fiveMin) {
        setShowWarning(true);
        setTimeLeft(Math.floor(remaining / 1000));
      } else {
        setShowWarning(false);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 30000); // check every 30 seconds
    return () => clearInterval(interval);
  }, [user]);

  // Countdown timer
  useEffect(() => {
    if (!showWarning) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showWarning]);

  const handleRefresh = async () => {
    const { error } = await supabase.auth.refreshSession();
    if (!error) setShowWarning(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className={styles.banner}>
      <span className={styles.icon}>⚠️</span>
      <span className={styles.text}>
        Your session expires in <strong>{minutes}:{seconds}</strong> — any unsaved changes will be lost.
      </span>
      <div className={styles.actions}>
        <button className={styles.refreshBtn} onClick={handleRefresh}>Stay Logged In</button>
        <button className={styles.signOutBtn} onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default SessionWarning;
