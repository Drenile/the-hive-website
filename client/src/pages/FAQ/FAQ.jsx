import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './FAQ.module.css';
import laptopImg from '../../assets/hands-together-laptop.jpg';

const faqs = [
  { cat: 'general',    q: 'What is The Hive?',                              a: 'The Hive is a student-led community at the University of Lethbridge built around collaboration, real experience, and meaningful growth. We bring together students from different programs to work on real projects, learn from each other, and build confidence before stepping into professional spaces.' },
  { cat: 'general',    q: 'Who can join The Hive?',                         a: "Any University of Lethbridge student is welcome, regardless of program, year, or experience level. Whether you're in business, computer science, design, or another field, there's a place for you here." },
  { cat: 'general',    q: 'Is The Hive officially recognized by the university?', a: "Yes, The Hive is a registered student club at the University of Lethbridge. We operate under the university's student association and follow all relevant policies and guidelines." },
  { cat: 'membership', q: 'How do I become a member?',                      a: "Joining is simple — visit our Get Involved page and fill in the interest form, or show up to any of our events to connect with the team. We welcome new members throughout the year." },
  { cat: 'membership', q: 'Is there a membership fee?',                     a: 'No — joining The Hive is completely free. Some specific events (like HiveConnect) may have a small ticket fee to cover venue and logistics costs, but general membership and most activities are always free.' },
  { cat: 'membership', q: 'How much time commitment is expected?',           a: "There's no minimum commitment. You can show up to as many or as few events as your schedule allows. Members working on active projects typically meet a few times a month, but school always comes first." },
  { cat: 'membership', q: 'Can I take on a leadership role?',               a: 'Absolutely. The Hive is student-led from top to bottom. We encourage members to step into project leads, committee roles, and exec positions as they grow. Open roles are announced at the start of each semester.' },
  { cat: 'events',     q: 'What kinds of events does The Hive run?',        a: 'We run a variety of events throughout the year: networking nights, workshops, portfolio review sessions, collab nights, speaker panels, and our annual flagship event HiveConnect.' },
  { cat: 'events',     q: 'What is HiveConnect?',                           a: "HiveConnect is our annual flagship event — a full-day showcase and networking event where students present their work, connect with industry professionals, and explore real opportunities. It's open to all U of L students." },
  { cat: 'events',     q: 'Do I need to RSVP for events?',                  a: 'For most events a quick RSVP helps us plan. Some ticketed events require registration in advance. Walk-ins are welcome at community events when space allows.' },
  { cat: 'projects',   q: 'What kind of projects does The Hive work on?',   a: 'Our projects span marketing, design, tech, and community — all real deliverables, not just exercises. Past projects have included brand campaigns, research reports, app concepts, and community initiatives.' },
  { cat: 'projects',   q: 'Can I pitch my own project idea?',               a: "Yes! We love member-driven ideas. If you have a concept you'd like to build with a team, bring it to a community meeting or reach out to an exec member." },
  { cat: 'projects',   q: 'Will my project work count toward my portfolio?', a: 'Absolutely. All Hive projects are real, documented work that you can feature in your portfolio. We encourage members to treat every project as a professional case study.' },
  { cat: 'partner',    q: 'How can my organization partner with The Hive?', a: 'We love working with organizations that want to support students and get something meaningful in return. Reach out to us at thehive.club@uleth.ca to start the conversation.' },
  { cat: 'partner',    q: 'What do partners get in return?',                a: 'Partners gain access to motivated, skilled students across multiple disciplines, brand visibility at our events and online channels, and authentic connections with the next generation of professionals.' },
  { cat: 'partner',    q: 'Can a company sponsor HiveConnect specifically?', a: 'Yes — HiveConnect sponsorship packages are available and include branding at the event, social media promotion, a speaking or tabling opportunity, and direct access to students.' },
];

const cats = ['all', 'general', 'membership', 'events', 'projects', 'partner'];
const catLabels = { all: 'All', general: 'General', membership: 'Membership', events: 'Events', projects: 'Projects', partner: 'Partnering' };

function FAQ() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch]       = useState('');
  const [openIdx, setOpenIdx]     = useState(null);

  const filtered = faqs.filter(f => {
    const matchCat    = activeCat === 'all' || f.cat === activeCat;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}><img src={laptopImg} alt="" aria-hidden="true" /></div>
        <div className={styles.heroOverlay} />
        <div className={`${styles.wrap} ${styles.heroWrap}`}>
          <ScrollReveal>
            <div className={styles.heroText}>
              <div className={styles.heroKicker}>✦ Got Questions?</div>
              <h1>Frequently Asked<br />Questions</h1>
              <p>Everything you need to know about The Hive — membership, events, projects, and more.</p>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input className={styles.searchInput} type="search" placeholder="Search all questions…" value={search} onChange={e => { setSearch(e.target.value); setActiveCat('all'); }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ BODY ── */}
      <section className={styles.body}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.cats}>
              {cats.map(cat => (
                <button key={cat} className={`${styles.cat} ${activeCat === cat ? styles.catActive : ''}`} onClick={() => { setActiveCat(cat); setSearch(''); }}>
                  {catLabels[cat]}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No questions match your search. <button className={styles.emptyReset} onClick={() => { setSearch(''); setActiveCat('all'); }}>Clear search</button></p>
              </div>
            ) : filtered.map((faq, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 0.05}>
                <div className={`${styles.item} ${openIdx === i ? styles.itemOpen : ''}`}>
                  <button className={styles.itemBtn} onClick={() => toggle(i)} aria-expanded={openIdx === i}>
                    <span>{faq.q}</span>
                    <svg className={styles.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openIdx === i && (
                    <div className={styles.itemBody}><p>{faq.a}</p></div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.ctaInner}>
              <div className={styles.ctaText}>
                <h2>Still have questions?</h2>
                <p>Can't find what you're looking for? We're happy to help — reach out directly and we'll get back to you.</p>
              </div>
              <Link className={styles.ctaBtn} to="/contact">Contact Us →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default FAQ;
