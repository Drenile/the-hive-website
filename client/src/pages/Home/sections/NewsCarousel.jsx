import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/shared/ScrollReveal';
import styles from './NewsCarousel.module.css';
import { getArticles } from '../../../services/api';
import { getImageUrl } from '../../../utils/getImageUrl';
import star4    from '../../../assets/4-star.png';
import starPink from '../../../assets/pink-upside-emphasis.png';

const GAP = 22;


const btnColor = { spotlight: 'yellow', event: 'green', resource: 'pink' };

function NewsCarousel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [idx, setIdx]           = useState(0);
  const trackRef                = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getArticles({ limit: 5 });
        setArticles(data || []);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const cardW   = () => { const card = trackRef.current?.querySelector(`.${styles.card}`); return card ? card.offsetWidth : 320; };
  const visible = () => { const vp = trackRef.current?.parentElement; return vp ? Math.max(1, Math.floor((vp.offsetWidth + GAP) / (cardW() + GAP))) : 1; };
  const maxIdx  = () => Math.max(0, articles.length - visible());

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

        {loading ? (
          <div className={styles.loading}>Loading news...</div>
        ) : (
          <>
            <div className={styles.carousel}>
              <button className={styles.arrow} onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous">←</button>
              <div className={styles.viewport}>
                <div className={styles.track} ref={trackRef}>
                  {articles.map((article) => (
                    <article key={article.id} className={styles.card}>
                      {article.image_url && (
                        <img src={getImageUrl(article.image_url)} alt={article.title} />
                      )}
                      <div className={styles.cardBody}>
                        <h3>{article.title}</h3>
                        <span className={styles.pill}>
                          {article.tag === 'spotlight' ? 'Spotlight' : article.tag === 'event' ? 'Event Recap' : 'Resource'}
                        </span>
                        {article.excerpt && <p>{article.excerpt}</p>}
                        <button className={`${styles.btnMini} ${styles[`btnMini--${btnColor[article.tag] || 'green'}`]}`}>
                          Learn More
                        </button>
                      </div>
                    </article>
                  ))}

                  {/* See More card */}
                  <article className={`${styles.card} ${styles.cardSeeMore}`}>
                    <div className={styles.seeMoreInner}>
                      <div className={styles.seeMoreIcon} aria-hidden="true">→</div>
                      <p>Want to see all our updates and stories?</p>
                      <Link className={styles.btnOutline} to="/news">See All News</Link>
                    </div>
                  </article>
                </div>
              </div>
              <button className={styles.arrow} onClick={() => goTo(idx + 1)} disabled={idx >= maxIdx()} aria-label="Next">→</button>
            </div>

            <ScrollReveal>
              <div className={styles.seeMore}>
                <Link to="/news" className={styles.btnOutlineLight}>See More News →</Link>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}

export default NewsCarousel;
