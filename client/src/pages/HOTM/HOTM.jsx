import { Link } from 'react-router-dom';
import styles from './HOTM.module.css';
import facePortrait from '../../assets/face portrait.png';
import hiver1 from '../../assets/hiver1.jpg';
import hiver2 from '../../assets/hiver2.jpg';
import hiver3 from '../../assets/hiver3.jpg';
import laptop  from '../../assets/hands together laptop.jpg';

function HOTM() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}><img src={facePortrait} alt="Adesola Okafor" /></div>
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroTitle} ${styles.wrap}`}>
          <div className={styles.heroKicker}>✦ Hiver of the Month</div>
          <h1>Adesola<br />Okafor</h1>
          <div className={styles.heroSub}>May 2026 · Computer Science · Year 3</div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <main className={styles.article}>
        <div className={`${styles.wrap} ${styles.articleInner}`}>

          <div className={styles.tags}>
            <span className={`${styles.pill} ${styles.pillGreen}`}>HOTM</span>
            <span className={`${styles.pill} ${styles.pillPink}`}>Hiver</span>
            <span className={`${styles.pill} ${styles.pillYellow}`}>May 2026</span>
          </div>

          <h2 className={styles.headline}>Meet Adesola: May 2026 Hiver of the Month</h2>
          <div className={styles.meta}>
            <span>May 2026</span><span className={styles.metaDot}>·</span>
            <span>Member Spotlight</span><span className={styles.metaDot}>·</span>
            <span>4 min read</span>
          </div>

          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.profileImg}><img src={hiver1} alt="Adesola Okafor" /></div>
            <div className={styles.profileInfo}>
              <div className={styles.profileBadge}>🐝 Hiver of the Month</div>
              <div className={styles.profileName}>Adesola Okafor</div>
              <div className={styles.profileDetails}>
                {[['🎓','Computer Science · Year 3'],['📍','University of Lethbridge'],['📅','Hiver since Fall 2024'],['💼','Software Development · UI Design']].map(([icon, text], i) => (
                  <div key={i} className={styles.profileDetail}><span>{icon}</span>{text}</div>
                ))}
              </div>
              <div className={styles.hiverLinks}>
                <a className={styles.hiverLink} href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className={styles.hiverLink} href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className={styles.hiverLink} href="#" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </div>
            </div>
          </div>

          <blockquote className={styles.pullQuote}>
            "The Hive gave me the confidence to stop waiting for experience and start building it. I walked into my first internship interview feeling ready — and that's because of this community."
            <cite>— Adesola Okafor</cite>
          </blockquote>

          <section className={styles.section}>
            <h3>About Adesola</h3>
            <p>Adesola is a third-year Computer Science student at the University of Lethbridge with a passion for building technology that actually matters. Originally from Lagos, Nigeria, she moved to Canada to pursue her degree and found herself navigating a new country, a new academic system, and a new industry — all at once.</p>
            <p>Before joining The Hive, Adesola describes feeling like she was always one step behind. "I knew the theory from class, but I had no idea how teams actually worked, how projects got done, or how to talk about what I could do." That changed when she attended her first Hive event in the fall of 2024.</p>
          </section>

          <div className={styles.photoGrid}>
            <div className={`${styles.photoItem} ${styles.photoTall}`}><img src={hiver2} alt="Adesola at a Hive event" /></div>
            <div className={`${styles.photoItem} ${styles.photoMid}`}><img src={laptop} alt="Collaborating at The Hive" /></div>
            <div className={`${styles.photoItem} ${styles.photoShort}`}><img src={hiver3} alt="LeadFest 2026" /></div>
          </div>

          <section className={styles.section}>
            <h3>How She Showed Up For The Hive</h3>
            <p>Adesola joined The Hive as a general member but quickly became one of its most consistent contributors. She took on a development role in the Black History Month Community Project, building the front-end of a digital storytelling platform that reached over 300 students across campus.</p>
            <p>She also played a key role at LeadFest 2026, where she represented The Hive during the student showcase and presented her project work to industry professionals.</p>
          </section>

          <section className={styles.section}>
            <h3>Personal Achievements</h3>
            <ul className={styles.achievementList}>
              {[
                ['🏆','Dean\'s List — Fall 2024 & Winter 2025','Maintained a 3.8 GPA while balancing coursework and active Hive involvement.'],
                ['💼','Summer 2025 Software Internship','Secured her first paid internship in software development, crediting The Hive\'s real-project experience as a key differentiator.'],
                ['🎤','Student Speaker — LeadFest 2026','Selected to present her Hive project work to an audience of students and industry professionals.'],
                ['🌱','Mentored 3 First-Year Students','Informally mentored incoming Hivers on navigating university, building a portfolio, and finding their place in tech.'],
              ].map(([icon, title, desc], i) => (
                <li key={i}><span className={styles.achievementIcon}>{icon}</span><div><strong>{title}</strong><p>{desc}</p></div></li>
              ))}
            </ul>
          </section>

          <blockquote className={`${styles.pullQuote} ${styles.pullQuoteAlt}`}>
            "My advice to anyone joining The Hive? Don't wait until you feel ready. You become ready by showing up."
            <cite>— Adesola Okafor</cite>
          </blockquote>

          <div className={styles.back}>
            <Link className={styles.backBtn} to="/news">← Back To News</Link>
          </div>

        </div>
      </main>
    </>
  );
}

export default HOTM;
