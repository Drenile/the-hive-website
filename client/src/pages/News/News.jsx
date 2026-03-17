import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './News.module.css';

import facePortrait from '../../assets/face portrait.png';
import img0943      from '../../assets/IMG_0943.JPG';
import leadfest     from '../../assets/leadfest 3 smile.JPG';
import portfolio    from '../../assets/porfolio.jpg';
import img4270      from '../../assets/IMG_4270.jpg';
import hiver1       from '../../assets/hiver1.jpg';
import laptop       from '../../assets/hands together laptop.jpg';
import hiver2       from '../../assets/hiver2.jpg';
import img0944      from '../../assets/IMG_0944.JPG';

const initialNews = [
  { img: img0943,   title: 'Black History Month Community Project',  tags: 'spotlight', pill: 'Spotlight',   pillColor: 'green',  btn: 'yellow' },
  { img: leadfest,  title: 'LeadFest 2026 Recap',                   tags: 'event',     pill: 'Event Recap', pillColor: 'pink',   btn: 'green',  desc: 'A dynamic event where students connected with leaders, mentors, and peers across disciplines.' },
  { img: portfolio, title: 'How To Build A Portfolio That Stands Out', tags: 'resource', pill: 'Resource',  pillColor: 'yellow', btn: 'pink',   desc: 'Practical tips from our Portfolio Review day to help you present your work with confidence.' },
  { img: img4270,   title: 'Photo Day & LinkedIn Recap',             tags: 'event',     pill: 'Event Recap', pillColor: 'pink',   btn: 'pink',   desc: "A hands-on session to help students build a strong professional presence — here's what happened." },
  { img: hiver1,    title: 'Meet Adesola: Hiver Of The Month',       tags: 'spotlight', pill: 'Spotlight',   pillColor: 'green',  btn: 'yellow', desc: 'Meet the students making an impact inside and outside The Hive community this semester.' },
  { img: laptop,    title: '5 Skills You Can Build Right Now',       tags: 'resource',  pill: 'Resource',    pillColor: 'yellow', btn: 'green',  desc: "Short, practical sessions to level up your skills and confidence — here's what went down." },
  { img: leadfest,  title: 'Collab Night Recap',                     tags: 'event',     pill: 'Event Recap', pillColor: 'pink',   btn: 'yellow', desc: 'Meet people across majors and build something small together — here\'s how it went.' },
  { img: hiver2,    title: 'Hiver of the Month: February',           tags: 'spotlight', pill: 'Spotlight',   pillColor: 'green',  btn: 'pink',   desc: "Every month we spotlight a Hiver making waves. Meet February's standout member." },
  { img: img0944,   title: 'How To Prep For Industry Connect Night', tags: 'resource',  pill: 'Resource',    pillColor: 'yellow', btn: 'green',  desc: "Real conversations, real opportunities — here's how to make the most of them." },
];

const extraNews = [
  { img: img0943,  title: 'Project Update: Black History Month', tags: 'event',    pill: 'Event Recap', pillColor: 'pink',   btn: 'yellow', desc: 'How the team pulled together a meaningful community project in under three weeks.' },
  { img: leadfest, title: 'Networking Tips From Hivers',         tags: 'resource', pill: 'Resource',    pillColor: 'yellow', btn: 'green',  desc: 'Real advice from students who have been in the room and made it count.' },
  { img: laptop,   title: 'Hiver Spotlight: March',              tags: 'spotlight', pill: 'Spotlight',  pillColor: 'green',  btn: 'pink',   desc: 'This month we spotlight a Hiver who turned a small idea into a real project.' },
];

function News() {
  const [search, setSearch]           = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterOpen, setFilterOpen]   = useState(false);
  const [news, setNews]               = useState(initialNews);
  const [loadedExtra, setLoadedExtra] = useState(0);

  const filtered = news.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.tags.includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || n.tags.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  const loadMore = () => {
    const slice = extraNews.slice(loadedExtra, loadedExtra + 3);
    setNews(prev => [...prev, ...slice]);
    setLoadedExtra(prev => prev + slice.length);
  };

  return (
    <>
      {/* ── HERO SPOTLIGHT ── */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
        </div>
        <ScrollReveal className={styles.spotlight}>
          <div className={styles.spotlightImg}>
            <img src={facePortrait} alt="Adesola — Hiver of the Month" />
          </div>
          <div className={styles.spotlightBody}>
            <span className={styles.spotlightBadge}>✦ Membership Spotlight</span>
            <h1>Meet Adesola:<br />Hiver Of The Month!!</h1>
            <p>Adesola is a Computer Science student passionate about building real solutions that create impact. Through The Hive, she has contributed to cross-functional projects and continuously pushed herself to grow beyond the classroom.</p>
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
              <p>Explore event recaps, member spotlights, project updates, and practical resources to stay informed and involved with The Hive.</p>
            </div>
          </ScrollReveal>

          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className={styles.searchInput} type="search" placeholder="Search news…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Filter */}
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

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <article key={i} className={styles.card}>
                <img src={item.img} alt={item.title} />
                <div className={styles.cardBody}>
                  <h3>{item.title}</h3>
                  <span className={`${styles.pill} ${styles[`pill--${item.pillColor}`]}`}>{item.pill}</span>
                  {item.desc && <p>{item.desc}</p>}
                  <button className={`${styles.btnMini} ${styles[`btnMini--${item.btn}`]}`}>Learn More</button>
                </div>
              </article>
            ))}
          </div>

          {loadedExtra < extraNews.length && (
            <div className={styles.loadMore}>
              <button className={styles.loadMoreBtn} onClick={loadMore}>
                Load More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default News;
