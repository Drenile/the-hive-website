import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/shared/ScrollReveal';
import styles from './NewsCarousel.module.css';
import star4      from '../../../assets/4 star.png';
import starPink   from '../../../assets/pink upside empasis.png';
import img1 from '../../../assets/IMG_0943.JPG';
import img2 from '../../../assets/IMG_4270.jpg';
import img3 from '../../../assets/porfolio.jpg';
import img4 from '../../../assets/leadfest 3 smile.JPG';

const newsItems = [
  { id: 1, img: img1, title: 'Black History Month Community Project',  tag: 'Coming Soon', desc: 'A student-led project centered on storytelling, collaboration, and community impact.',                            btnColor: 'yellow' },
  { id: 2, img: img2, title: 'Photo Day & LinkedIn Optimization',       tag: 'Coming Soon', desc: 'A hands-on session to help you build a strong professional presence, from headshots to profile feedback.',      btnColor: 'green'  },
  { id: 3, img: img3, title: 'Portfolio Review & Build Day',            tag: 'Coming Soon', desc: 'An open working session for refining your portfolio, getting feedback, and learning how to present your work.', btnColor: 'pink'   },
  { id: 4, img: img4, title: 'Collab Night',                            tag: 'Coming Soon', desc: 'Meet people across majors and build something small together.',                                                  btnColor: 'yellow' },
  { id: 5, img: img4, title: 'Workshop Series',                         tag: 'Coming Soon', desc: 'Short, practical sessions to level up your skills and confidence.',                                             btnColor: 'green'  },
];

const GAP = 22;

function NewsCarousel() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);

  const cardW = () => {
    const card = trackRef.current?.querySelector(`.${styles.card}`);
    return card ? card.offsetWidth : 320;
  };
  const visible = () => {
    const vp = trackRef.current?.parentElement;
    return vp ? Math.max(1, Math.floor((vp.offsetWidth + GAP) / (cardW() + GAP))) : 1;
  };
  const maxIdx = () => Math.max(0, newsItems.length - visible());

  const goTo = (n) => {
    const next = Math.max(0, Math.min(n, maxIdx()));
    setIdx(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * (cardW() + GAP)}px)`;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <img className={`${styles.star} ${styles.starLeft}`}  src={star4}    alt="" aria-hidden="true" />
        <img className={`${styles.star} ${styles.starRight}`} src={starPink} alt="" aria-hidden="true" />

        <ScrollReveal>
          <header className={styles.header}>
            <h2>what's new at the hive</h2>
            <p>Updates, events, and opportunities you don't want to miss.</p>
          </header>
        </ScrollReveal>

        <div className={styles.carousel}>
          <button className={styles.arrow} onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous">←</button>
          <div className={styles.viewport}>
            <div className={styles.track} ref={trackRef}>
              {newsItems.map(item => (
                <article key={item.id} className={styles.card}>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.cardBody}>
                    <h3>{item.title}</h3>
                    <span className={styles.pill}>Coming Soon</span>
                    <p>{item.desc}</p>
                    <button className={`${styles.btnMini} ${styles[`btnMini--${item.btnColor}`]}`}>Learn More</button>
                  </div>
                </article>
              ))}
              <article className={`${styles.card} ${styles.cardSeeMore}`}>
                <div className={styles.seeMoreInner}>
                  <div className={styles.seeMoreIcon} aria-hidden="true">→</div>
                  <p>Want to see all our upcoming events and projects?</p>
                  <Link className={styles.btnOutline} to="/events">See All Events</Link>
                </div>
              </article>
            </div>
          </div>
          <button className={styles.arrow} onClick={() => goTo(idx + 1)} disabled={idx >= maxIdx()} aria-label="Next">→</button>
        </div>

        <ScrollReveal>
          <div className={styles.seeMore}>
            <Link to="/events" className={styles.btnOutlineLight}>See More Events →</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default NewsCarousel;
