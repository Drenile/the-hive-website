import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './News.module.css';
import { getArticles } from '../../services/api';
import { getImageUrl } from '../../utils/getImageUrl';
import facePortrait from '../../assets/face-portrait.png';

const pillColor = { spotlight: 'green', event: 'pink', resource: 'yellow' };
const pillLabel = { spotlight: 'Spotlight', event: 'Event Recap', resource: 'Resource' };
const btnColor  = { spotlight: 'yellow', event: 'green', resource: 'pink' };

function News() {
  const [articles, setArticles]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterOpen, setFilterOpen]     = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await getArticles();
        setArticles(data || []);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || (a.tag || '').includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || a.tag === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      {/* ── HERO SPOTLIGHT ── */}
      <section className={styles.hero}>
        <div className={styles.wrap} />
        <ScrollReveal className={styles.spotlight}>
          <div className={styles.spotlightImg}>
            <img src={facePortrait} alt="Adesola — Hiver of the Month" />
          </div>
          <div className={styles.spotlightBody}>
            <span className={styles.spotlightBadge}>✦ Membership Spotlight</span>
            <h1>Meet Adesola:<br />Hiver Of The Month!!</h1>
            <p>Adesola is a Computer Science student passionate about building real solutions that create impact.</p>
            <Link className={styles.btnPink} to="/hotm">Read More</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── EXPLORE NEWS ── */}
      <section className={styles.explore}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.exploreHeader}>
              <h2>Explore The Hive News</h2>
              <p>Explore event recaps, member spotlights, project updates, and practical resources.</p>
            </div>
          </ScrollReveal>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className={styles.searchInput} type="search" placeholder="Search news…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className={styles.filterBar}>
            <button className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : styles.filterBtnOutline}`} onClick={() => setActiveFilter('all')}>All Blogs</button>
            <button className={`${styles.filterBtnIcon} ${filterOpen ? styles.filterBtnIconOpen : ''}`} onClick={() => setFilterOpen(p => !p)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filter
              {activeFilter !== 'all' && <span className={styles.filterDot} />}
            </button>
          </div>
          {filterOpen && (
            <div className={styles.filterDropdown}>
              {[['spotlight','Spotlight'],['event','Event Recap'],['resource','Resource']].map(([val, label]) => (
                <button key={val} className={`${styles.filterBtn} ${activeFilter === val ? styles.filterBtnActive : styles.filterBtnOutline}`} onClick={() => { setActiveFilter(val); setFilterOpen(false); }}>{label}</button>
              ))}
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>Loading news...</div>
          ) : (
            <div className={styles.grid}>
              {filtered.length === 0 ? (
                <p className={styles.empty}>No articles found.</p>
              ) : filtered.map((article) => (
                <article key={article.id} className={styles.card}>
                  {article.image_url && <img src={getImageUrl(article.image_url)} alt={article.title} />}
                  <div className={styles.cardBody}>
                    <h3>{article.title}</h3>
                    <span className={`${styles.pill} ${styles[`pill--${pillColor[article.tag]}`]}`}>
                      {pillLabel[article.tag]}
                    </span>
                    {article.excerpt && <p>{article.excerpt}</p>}
                    <button className={`${styles.btnMini} ${styles[`btnMini--${btnColor[article.tag]}`]}`}>Learn More</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default News;
