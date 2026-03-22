import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './Events.module.css';
import { getEvents } from '../../services/api';
import { getImageUrl } from '../../utils/getImageUrl';
import pinkEmphasis from '../../assets/pink upside empasis.png';

const EVENT_DATE = new Date('2027-01-17T09:00:00');

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

// Map asset filenames to imported images

function Events() {
  const countdown = useCountdown(EVENT_DATE);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState('');
  const [activeFilter, setActiveFilter]     = useState('all');
  const [filterOpen, setFilterOpen]         = useState(false);
  const [carouselIdx, setCarouselIdx]       = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          getEvents({ status: 'upcoming' }),
          getEvents({ status: 'past' }),
        ]);
        setUpcomingEvents(upcomingRes.data || []);
        setPastEvents(pastRes.data || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredPast = pastEvents.filter(e => {
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || (e.tag || '').includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || e.tag === activeFilter;
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
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
            <p>HiveConnect is our annual showcase and networking event created to help students build confidence, share their work, and connect with people already working in the industry.</p>
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

          {loading ? (
            <div className={styles.loading}>Loading events...</div>
          ) : upcomingEvents.length === 0 ? (
            <div className={styles.empty}>No upcoming events right now — check back soon!</div>
          ) : (
            <>
              <div className={styles.carouselWrap}>
                <button className={styles.arrow} onClick={() => scrollTo(Math.max(0, carouselIdx - 1))} disabled={carouselIdx === 0} aria-label="Previous">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className={styles.carousel} ref={carouselRef}>
                  {upcomingEvents.map((ev, i) => (
                    <article key={ev.id} className={styles.evCard}>
                      {ev.image_url && <img src={getImageUrl(ev.image_url)} alt={ev.title} />}
                      <div className={styles.evCardBody}>
                        <div className={styles.evCardMeta}>
                          <span className={styles.evCardDate}>{formatDate(ev.event_date)}</span>
                          <span className={`${styles.pill} ${styles['pill--green']}`}>Upcoming</span>
                        </div>
                        <h3>{ev.title}</h3>
                        <p>{ev.description}</p>
                        <button className={`${styles.btnMini} ${styles['btnMini--green']}`}>Learn More</button>
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
            </>
          )}
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section className={styles.pastEvents}>
        <div className={styles.wrap}>
          <ScrollReveal><div className={styles.pastHeader}><h2>Explore Past Events</h2></div></ScrollReveal>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className={styles.searchInput} type="search" placeholder="Search events…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

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

          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <div className={styles.pastGrid}>
              {filteredPast.length === 0 ? (
                <p className={styles.empty}>No events found.</p>
              ) : filteredPast.map((ev) => (
                <article key={ev.id} className={styles.pastCard}>
                  {ev.image_url && <img src={getImageUrl(ev.image_url)} alt={ev.title} />}
                  <div className={styles.pastCardBody}>
                    <h3>{ev.title}</h3>
                    <span className={styles.pill}>{formatDate(ev.event_date)}</span>
                    <p>{ev.description}</p>
                    <button className={`${styles.btnMini} ${styles['btnMini--green']}`}>Learn More</button>
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

export default Events;
