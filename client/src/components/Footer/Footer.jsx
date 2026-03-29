import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../services/api';
import styles from './Footer.module.css';
import subscribeIcon from '../../assets/subscribe.png';

function Footer() {
  const [email, setEmail]     = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus]   = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setEmail('');
      setConsent(false);
      setStatus('success');
      setMessage("You're subscribed!");
    } catch (err) {
      setStatus('error');
      setMessage(err.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Let's Keep In Touch</h2>
        <p className={styles.sub}>Join Our Newsletter!!!</p>

        <form className={styles.newsletter} onSubmit={handleSubscribe} noValidate>
          <input
            className={styles.input}
            type="email"
            placeholder="EMAIL"
            aria-label="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            required
          />
          <button className={styles.btn} type="submit" disabled={status === 'loading' || !consent}>
            <img src={subscribeIcon} alt="" aria-hidden="true" width="20" height="20" />
            {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>

        {/* CASL Consent */}
        <div className={styles.consentWrap}>
          <input
            type="checkbox"
            id="newsletterConsent"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
          <label htmlFor="newsletterConsent">
            I consent to receiving emails from The Hive. I can unsubscribe at any time. See our <Link to="/privacy" className={styles.consentLink}>Privacy Policy</Link>.
          </label>
        </div>

        {status === 'success' && <p className={styles.successMsg}>✅ {message}</p>}
        {status === 'error'   && <p className={styles.errorMsg}>❌ {message}</p>}

        <div className={styles.bottom}>
          <div className={styles.links}>
            <div className={styles.col}>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className={styles.col}>
              <Link to="/get-involved">Get Involved</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className={styles.socials} aria-label="Social links">
            <a href="https://www.instagram.com/thehive_official?igsh=a2k5YzVrbjd4bHpu&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/the-hiveclub/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://discord.com/invite/KqNYtZuVM" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.908 19.908 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            </a>
            <a href="mailto:thehive.club@uleth.ca" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
