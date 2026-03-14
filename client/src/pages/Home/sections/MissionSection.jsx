import ScrollReveal from '../../../components/shared/ScrollReveal';
import styles from './MissionSection.module.css';

function MissionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.banner}>
          <ScrollReveal className={styles.content}>
            <div className={styles.kicker}>what we do</div>
            <p className={styles.text}>
              The Hive's Mission Is To Give Students Real Experience Working In Cross-Functional
              Teams And To Create A Supportive Space That Helps Them Build Confidence And Access
              Career Opportunities They Feel Comfortable In
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
