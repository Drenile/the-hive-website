import { useState, useEffect } from 'react';
import styles from './StatsBar.module.css';

function StatsBar() {
  const [stats, setStats] = useState([
    { num: '100+', label: 'members' },
    { num: '25+',  label: 'projects' },
    { num: '10+',  label: 'partners' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
        const { data } = await res.json();
        setStats([
          { num: data.members  > 0 ? `${data.members}+`  : '100+', label: 'members'  },
          { num: data.projects > 0 ? `${data.projects}+` : '25+',  label: 'projects' },
          { num: '10+',                                              label: 'partners' },
        ]);
      } catch {
        // Keep default values on error
      }
    };
    fetchStats();
  }, []);

  return (
    <section className={styles.statsBar} aria-label="Community stats">
      <div className={styles.inner}>
        {[...stats, ...stats].map((s, i) => (
          <div key={i} aria-hidden={i >= stats.length} style={{ display: 'contents' }}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsBar;
