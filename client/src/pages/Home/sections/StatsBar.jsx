import styles from './StatsBar.module.css';

const stats = [
  { num: '100+', label: 'members' },
  { num: '25+',  label: 'projects' },
  { num: '10+',  label: 'partners' },
];

function StatsBar() {
  return (
    <section className={styles.statsBar} aria-label="Community stats">
      <div className={styles.inner}>
        {[...stats, ...stats].map((s, i) => (
          <>
            <div className={styles.statItem} key={`stat-${i}`} aria-hidden={i >= stats.length}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
            <div className={styles.statDivider} key={`div-${i}`} aria-hidden="true" />
          </>
        ))}
      </div>
    </section>
  );
}

export default StatsBar;
