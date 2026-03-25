import { useState, useEffect } from 'react';
import styles from './AdminSection.module.css';

function StatCard({ label, value, color }) {
  return (
    <div className={styles.statCard} style={{ borderTopColor: color }}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function AdminOverview() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
        const { data } = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className={styles.overviewHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
        <p className={styles.pageSub}>Welcome back! Here's what's happening at The Hive.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading stats...</div>
      ) : (
        <div className={styles.statsGrid}>
          <StatCard label="Total Members"  value={stats?.members  ?? '—'} color="#7EBD3E" />
          <StatCard label="Total Events"   value={stats?.events   ?? '—'} color="#FF66C4" />
          <StatCard label="Total Projects" value={stats?.projects ?? '—'} color="#FFDB5A" />
        </div>
      )}

      <div className={styles.infoCard}>
        <h3>Quick Actions</h3>
        <p>Use the sidebar to manage events, articles, users, contact submissions, and newsletter subscribers.</p>
      </div>
    </div>
  );
}

export default AdminOverview;
