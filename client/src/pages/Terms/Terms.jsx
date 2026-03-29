import { Link } from 'react-router-dom';
import styles from '../Privacy/Privacy.module.css';

const LAST_UPDATED  = 'March 2026';
const CONTACT_EMAIL = 'thehive.club@uleth.ca';

function Terms() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.badge}>Legal</div>
          <h1>Terms of Service</h1>
          <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div className={styles.body}>

          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using The Hive website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            <p>These terms apply to all visitors, members, mentors, and partners of The Hive community club at the University of Lethbridge.</p>
          </section>

          <section className={styles.section}>
            <h2>2. About The Hive</h2>
            <p>The Hive is a student-led community club registered at the University of Lethbridge in Lethbridge, Alberta, Canada. We provide a platform for students to collaborate on real projects, connect with mentors, and build professional skills.</p>
          </section>

          <section className={styles.section}>
            <h2>3. Membership and Accounts</h2>
            <p>To access certain features of our platform, you must create an account. By creating an account you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Take responsibility for all activities that occur under your account</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms or our community standards.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Acceptable Use</h2>
            <p>You agree not to use The Hive platform to:</p>
            <ul>
              <li>Harass, bully, or harm other members</li>
              <li>Share false, misleading, or defamatory content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Spam or send unsolicited communications to other members</li>
              <li>Impersonate another person or organization</li>
              <li>Share content that is discriminatory, hateful, or offensive</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Intellectual Property</h2>
            <p>Content you submit to The Hive (project work, posts, submissions) remains your intellectual property. By submitting content, you grant The Hive a non-exclusive license to display and share that content within the community platform.</p>
            <p>The Hive's branding, logo, and website design are owned by The Hive and may not be used without permission.</p>
          </section>

          <section className={styles.section}>
            <h2>6. Projects and Collaboration</h2>
            <p>When participating in Hive projects:</p>
            <ul>
              <li>All collaborators retain rights to their individual contributions unless otherwise agreed in writing</li>
              <li>Project teams should establish clear agreements about ownership before starting work</li>
              <li>The Hive may showcase project work for community and promotional purposes with member consent</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Privacy</h2>
            <p>Your use of The Hive is also governed by our <Link to="/privacy">Privacy Policy</Link>, which is incorporated into these Terms of Service by reference. By using our services you consent to the collection and use of your information as described in our Privacy Policy.</p>
          </section>

          <section className={styles.section}>
            <h2>8. Events and Activities</h2>
            <p>By attending Hive events you agree to:</p>
            <ul>
              <li>Behave respectfully toward all participants</li>
              <li>Follow any event-specific rules communicated by organizers</li>
              <li>Allow The Hive to photograph or record events for community documentation purposes</li>
            </ul>
            <p>Event tickets are non-refundable unless an event is cancelled by The Hive.</p>
          </section>

          <section className={styles.section}>
            <h2>9. Disclaimer of Warranties</h2>
            <p>The Hive platform is provided "as is" without warranties of any kind. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements. We are a student-run volunteer organization and provide these services on a best-effort basis.</p>
          </section>

          <section className={styles.section}>
            <h2>10. Limitation of Liability</h2>
            <p>To the fullest extent permitted by Alberta law, The Hive and its organizers shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or participation in our activities.</p>
          </section>

          <section className={styles.section}>
            <h2>11. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of the Province of Alberta and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Alberta.</p>
          </section>

          <section className={styles.section}>
            <h2>12. Changes to These Terms</h2>
            <p>We may update these Terms of Service from time to time. We will notify members of significant changes by email. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section className={styles.section}>
            <h2>13. Contact Us</h2>
            <p>For any questions about these Terms of Service, contact us at:</p>
            <div className={styles.contactBlock}>
              <strong>The Hive Community Club</strong><br />
              University of Lethbridge<br />
              Lethbridge, Alberta, Canada<br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </section>

        </div>

        <div className={styles.footer}>
          <Link to="/" className={styles.backBtn}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Terms;
