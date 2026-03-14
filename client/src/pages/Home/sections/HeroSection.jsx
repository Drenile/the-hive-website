import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/shared/ScrollReveal';
import styles from './HeroSection.module.css';
import heroImg from '../../../assets/students smiling.jpg';

function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <ScrollReveal className={styles.heroText}>
            <h1>Building Real Connections.<br />Growing Practical Skills.</h1>
            <p>The Hive is a student-led community built around collaboration, not competition.</p>
            <p>We work on real projects, learn from real people, and grow skills that actually matter — together.</p>
            <div className={styles.heroBtns}>
              <Link className={styles.btnGreen} to="/get-involved">Get Involved</Link>
              <Link className={styles.btnWhite} to="/about">Learn More</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className={styles.heroImgWrap}>
            <img className={styles.heroImg} src={heroImg} alt="A group photo of students smiling." />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
