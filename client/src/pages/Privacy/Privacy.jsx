import { Link } from 'react-router-dom';
import styles from './Privacy.module.css';

const LAST_UPDATED = 'March 2026';
const CONTACT_EMAIL = 'thehive.club@uleth.ca';

function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.badge}>Legal</div>
          <h1>Privacy Policy</h1>
          <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div className={styles.body}>

          <section className={styles.section}>
            <h2>1. Who We Are</h2>
            <p>The Hive is a student-led community club operating at the University of Lethbridge in Alberta, Canada. We are committed to protecting the personal information of our members, visitors, and partners in accordance with Alberta's <em>Personal Information Protection Act</em> (PIPA) and Canada's Anti-Spam Legislation (CASL).</p>
            <p>For privacy-related inquiries, contact us at: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          </section>

          <section className={styles.section}>
            <h2>2. What Personal Information We Collect</h2>
            <p>We collect the following types of personal information:</p>
            <ul>
              <li><strong>Account information:</strong> Your name and email address when you create an account</li>
              <li><strong>Contact form submissions:</strong> Your name, email address, reason for contact, and message content</li>
              <li><strong>Newsletter subscriptions:</strong> Your email address</li>
              <li><strong>Profile information:</strong> Optional information you choose to provide such as bio, LinkedIn URL, GitHub URL, and portfolio URL</li>
              <li><strong>Technical information:</strong> IP addresses collected in our security audit logs</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Why We Collect This Information</h2>
            <p>We collect personal information for the following purposes:</p>
            <ul>
              <li>To create and manage your membership account</li>
              <li>To respond to your contact form inquiries</li>
              <li>To send you our newsletter and community updates (only with your consent)</li>
              <li>To maintain the security of our platform through audit logging</li>
              <li>To improve our services and community experience</li>
            </ul>
            <p>We will not use your personal information for any other purpose without your consent.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Legal Basis for Collection</h2>
            <p>Under PIPA, we collect personal information with your consent. By submitting a contact form, signing up for our newsletter, or creating an account, you are consenting to the collection and use of your personal information as described in this policy.</p>
            <p>You may withdraw your consent at any time by contacting us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>5. How We Store Your Information</h2>
            <p>Your personal information is stored securely using Supabase, a database platform that stores data on servers located in the United States (Amazon Web Services). By using our website, you acknowledge that your information may be transferred to and stored in the United States, which has different privacy laws than Canada.</p>
            <p>We take reasonable technical and organizational measures to protect your personal information including:</p>
            <ul>
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Role-based access controls limiting who can view your data</li>
              <li>Row-level security policies on our database</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. How Long We Keep Your Information</h2>
            <ul>
              <li><strong>Account data:</strong> Retained while your account is active. Deleted within 30 days of account deletion request.</li>
              <li><strong>Contact form submissions:</strong> Retained for 12 months then deleted.</li>
              <li><strong>Newsletter subscriptions:</strong> Retained until you unsubscribe.</li>
              <li><strong>Audit logs:</strong> Retained for 12 months for security purposes.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Who We Share Your Information With</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li><strong>Supabase:</strong> Our database and authentication provider</li>
              <li><strong>University of Lethbridge:</strong> If required by university policy as a registered student club</li>
              <li><strong>Law enforcement:</strong> If required by law or to protect the safety of our community</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>8. Your Rights Under PIPA</h2>
            <p>As an Alberta resident, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Withdraw consent:</strong> Withdraw consent to our use of your personal information</li>
              <li><strong>Complain:</strong> File a complaint with the Office of the Information and Privacy Commissioner of Alberta</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>
          </section>

          <section className={styles.section}>
            <h2>9. Newsletter and CASL Compliance</h2>
            <p>We only send newsletters and promotional emails to people who have explicitly subscribed. Every newsletter email includes an unsubscribe link. You can also unsubscribe at any time by contacting us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>10. Cookies and Local Storage</h2>
            <p>Our website uses browser local storage to maintain your login session. This is necessary for the website to function and is not used for tracking or advertising purposes. We do not use third-party tracking cookies.</p>
          </section>

          <section className={styles.section}>
            <h2>11. Children's Privacy</h2>
            <p>Our services are intended for university students who are typically 17 years of age or older. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section className={styles.section}>
            <h2>12. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify members of significant changes by email. The date at the top of this policy indicates when it was last updated.</p>
          </section>

          <section className={styles.section}>
            <h2>13. Contact Us</h2>
            <p>For any privacy-related questions or to exercise your rights, contact us at:</p>
            <div className={styles.contactBlock}>
              <strong>The Hive Community Club</strong><br />
              University of Lethbridge<br />
              Lethbridge, Alberta, Canada<br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <p>You may also contact the Office of the Information and Privacy Commissioner of Alberta at <a href="https://www.oipc.ab.ca" target="_blank" rel="noopener noreferrer">www.oipc.ab.ca</a> if you have concerns about how we handle your personal information.</p>
          </section>

        </div>

        <div className={styles.footer}>
          <Link to="/" className={styles.backBtn}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
