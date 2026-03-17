import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './Events.module.css';

import img4270   from '../../assets/IMG_4270.jpg';
import leadfest  from '../../assets/leadfest 3 smile.JPG';
import laptop    from '../../assets/hands together laptop.jpg';
import portfolio from '../../assets/porfolio.jpg';
import img0943   from '../../assets/IMG_0943.JPG';
import img0922   from '../../assets/IMG_0922.JPG';
import img0915   from '../../assets/IMG_0915.JPG';
import img0925   from '../../assets/IMG_0925.JPG';
import img0933   from '../../assets/IMG_0933.JPG';
import pinkEmphasis from '../../assets/pink upside empasis.png';

const EVENT_DATE = new Date('2027-01-17T09:00:00');

const upcomingEvents = [
  { img: img4270,   date: 'Apr 4, 2026 · 4:00 PM', pill: 'Coming Soon', pillColor: 'green',  title: 'Photo Day & LinkedIn Optimization',      desc: 'A hands-on session to help you build a strong professional presence.',       btn: 'green'  },
  { img: leadfest,  date: 'May 2, 2026 · 6:00 PM',  pill: 'Coming Soon', pillColor: 'pink',   title: 'Collab Night',                            desc: 'Meet people across majors and build something small together.',              btn: 'yellow' },
  { img: laptop,    date: 'May 10, 2026 · 2:00 PM', pill: 'Coming Soon', pillColor: 'yellow', title: 'Workshop Series',                         desc: 'Short, practical sessions to level up your skills and confidence.',          btn: 'green'  },
  { img: portfolio, date: 'Feb 10, 2026',            pill: 'Past Event',  pillColor: 'grey',   title: 'Portfolio Review & Build Day',            desc: 'An open working session for refining your portfolio.',                       btn: 'pink',  past: true },
  { img: img0943,   date: 'Feb 15, 2025',            pill: 'Past Event',  pillColor: 'grey',   title: 'Black History Month Community Project',   desc: 'A student-led project centered on storytelling and community impact.',       btn: 'yellow', past: true },
];

const initialPastEvents = [
  { img: img0943,   title: 'Black History Month Community Project', date: 'Feb 2025', tags: 'community',             desc: 'A student-led project centered on storytelling, collaboration, and community impact.',     btn: 'yellow' },
  { img: leadfest,  title: 'LeadFest 2026',                        date: 'Jan 26, 2026', tags: 'networking',         desc: 'A dynamic event where students connected with leaders, mentors, and peers.',              btn: 'green'  },
  { img: portfolio, title: 'Portfolio Review & Build Day',          date: 'Oct 2024', tags: 'portfolio',              desc: 'An open working session for refining your portfolio.',                                   btn: 'pink'   },
  { img: img4270,   title: 'Photo Day & LinkedIn Optimization',     date: 'Sep 2024', tags: 'networking portfolio',   desc: 'A hands-on session to help you build a strong professional presence.',                  btn: 'pink'   },
  { img: img0922,   title: 'Collab Night',                          date: 'Feb 2024', tags: 'community networking',   desc: 'Meet people across majors and build something small together.',                         btn: 'yellow' },
  { img: laptop,    title: 'Workshop Series',                       date: 'Jan 2024', tags: 'portfolio',              desc: 'Short, practical sessions to level up your skills and confidence.',                     btn: 'green'  },
];

const extraPastEvents = [
  { img: img0915, title: 'Study Hall Social',      date: 'Dec 2023', tags: 'community',        desc: 'A relaxed social studying session with snacks, music, and new connections.',     btn: 'yellow' },
  { img: img0925, title: 'Resume Review Night',    date: 'Nov 2023', tags: 'portfolio career',  desc: 'One-on-one resume feedback from peers and mentors to help you stand out.',        btn: 'green'  },
  { img: img0933, title: 'Industry Speaker Panel', date: 'Oct 2023', tags: 'networking',        desc: 'Professionals from tech, business, and creative fields answered your questions.', btn: 'pink'   },
];

function useCountdown(target) {
  const [time, setTime] = useState({ days: '--', hours: '--', mins: '--', secs: '--' });
  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) { setTime({ days: 0, hours: '00', mins: '00', secs: '00' }); return; }
      setTime({
        days:  Math.floor(diff / 86400000),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        mins:  String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        secs:  String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function Events() {
  const countdown = useCountdown(EVENT_DATE);
  const [search, setSearch]           = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterOpen, setFilterOpen]   = useState(false);
  const [pastEvents, setPastEvents]   = useState(initialPastEvents);
  const [loadedExtra, setLoadedExtra] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef(null);

  const filteredPast = pastEvents.filter(e => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.tags.includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || e.tags.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  const scrollTo = (idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.children[idx];
    if (!card) return;
    carousel.scrollTo({ left: card.offsetLeft - parseInt(getComputedStyle(carousel).paddingLeft), behavior: 'smooth' });
    setCarouselIdx(idx);
  };

  const loadMore = () => {
    const slice = extraPastEvents.slice(loadedExtra, loadedExtra + 3);
    setPastEvents(prev => [...prev, ...slice]);
    setLoadedExtra(prev => prev + slice.length);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.heroContent}>
              <div className={styles.badge}>✦ Flagship Event</div>
              <h1 className={styles.title}>
                <span>HiveConnect</span>
                <span>2026</span>
              </h1>
              <p className={styles.sub}>
                An annual showcase and networking event focused on real projects,<br />
                real conversations, and real opportunities.
              </p>
              <div className={styles.countdown} aria-label="Countdown to HiveConnect 2026">
                {[['Days', countdown.days], ['Hours', countdown.hours], ['Mins', countdown.mins], ['Secs', countdown.secs]].map(([label, val]) => (
                  <div key={label} className={styles.countdownUnit}>
                    <span className={styles.countdownNum}>{val}</span>
                    <span className={styles.countdownLabel}>{label}</span>
                  </div>
                ))}
              </div>
              <Link className={styles.cta} to="/events/booking">Reserve Your Spot →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHAT IS HIVECONNECT ── */}
      <section className={styles.whatIs}>
        <img className={`${styles.whatIsDeco} ${styles.whatIsDecoLeft}`} src={pinkEmphasis} alt="" aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.whatIsInner}`}>
          <ScrollReveal className={styles.whatIsText}>
            <h2>What Is HiveConnect?</h2>
            <div className={styles.underline} aria-hidden="true" />
            <p>HiveConnect is our annual showcase and networking event created to help students build confidence, share their work, and connect with people already working in the industry. It's a space where projects are celebrated, conversations happen naturally, and learning goes beyond the classroom.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className={styles.upcoming}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <h2>Upcoming Events</h2>
              <p>Beyond HiveConnect, The Hive hosts smaller events throughout the year focused on skill-building, career preparation, and community.</p>
            </div>
          </ScrollReveal>
          <div className={styles.carouselWrap}>
            <button className={styles.arrow} onClick={() => scrollTo(Math.max(0, carouselIdx - 1))} disabled={carouselIdx === 0} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className={styles.carousel} ref={carouselRef}>
              {upcomingEvents.map((ev, i) => (
                <article key={i} className={`${styles.evCard} ${ev.past ? styles.evCardPast : ''}`}>
                  <img src={ev.img} alt={ev.title} />
                  <div className={styles.evCardBody}>
                    <div className={styles.evCardMeta}>
                      <span className={styles.evCardDate}>{ev.date}</span>
                      <span className={`${styles.pill} ${styles[`pill--${ev.pillColor}`]}`}>{ev.pill}</span>
                    </div>
                    <h3>{ev.title}</h3>
                    <p>{ev.desc}</p>
                    <button className={`${styles.btnMini} ${styles[`btnMini--${ev.btn}`]}`}>{ev.past ? 'See Recap' : 'Learn More'}</button>
                  </div>
                </article>
              ))}
            </div>
            <button className={styles.arrowRight} onClick={() => scrollTo(Math.min(upcomingEvents.length - 1, carouselIdx + 1))} disabled={carouselIdx >= upcomingEvents.length - 1} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div className={styles.dots}>
            {upcomingEvents.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === carouselIdx ? styles.dotActive : ''}`} onClick={() => scrollTo(i)} aria-label={`Go to card ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section className={styles.pastEvents}>
        <div className={styles.wrap}>
          <ScrollReveal><div className={styles.pastHeader}><h2>Explore Past Events</h2></div></ScrollReveal>

          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className={styles.searchInput} type="search" placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Filter */}
          <div className={styles.filterBar}>
            <button className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : styles.filterBtnOutline}`} onClick={() => setActiveFilter('all')}>All Events</button>
            <button className={`${styles.filterBtnIcon} ${filterOpen ? styles.filterBtnIconOpen : ''}`} onClick={() => setFilterOpen(p => !p)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filter
              {activeFilter !== 'all' && <span className={styles.filterDot} />}
            </button>
          </div>
          {filterOpen && (
            <div className={styles.filterDropdown}>
              {['networking', 'portfolio', 'community'].map(tag => (
                <button key={tag} className={`${styles.filterBtn} ${activeFilter === tag ? styles.filterBtnActive : styles.filterBtnOutline}`} onClick={() => { setActiveFilter(tag); setFilterOpen(false); }}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className={styles.pastGrid}>
            {filteredPast.map((ev, i) => (
              <article key={i} className={styles.pastCard}>
                <img src={ev.img} alt={ev.title} />
                <div className={styles.pastCardBody}>
                  <h3>{ev.title}</h3>
                  <span className={styles.pill}>{ev.date}</span>
                  <p>{ev.desc}</p>
                  <button className={`${styles.btnMini} ${styles[`btnMini--${ev.btn}`]}`}>Learn More</button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          {loadedExtra < extraPastEvents.length && (
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

export default Events;
