import { Link } from 'react-router-dom';
import styles from './Projects.module.css';
import greenPuzzle   from '../../assets/green-puzzle.png';
import yellowDoodle  from '../../assets/yellow-doodle.png';
import star4         from '../../assets/4-star.png';

function Projects() {
  return (
    <section className={styles.hero}>
      <img className={`${styles.deco} ${styles.decoTL}`}   src={greenPuzzle}  alt="" aria-hidden="true" />
      <img className={`${styles.deco} ${styles.decoBR}`}   src={yellowDoodle} alt="" aria-hidden="true" />
      <img className={`${styles.deco} ${styles.decoStar}`} src={star4}        alt="" aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.kicker}>✦ Coming Soon</div>
        <h1 className={styles.title}>
          <span>Real</span>
          <span className={styles.titleOutline}>Projects.</span>
        </h1>
        <p className={styles.sub}>We're building something great. The Projects showcase is on its way — featuring real work from real Hivers. Check back soon.</p>
        <Link className={styles.cta} to="/contact">Get Involved →</Link>
      </div>
    </section>
  );
}

export default Projects;
