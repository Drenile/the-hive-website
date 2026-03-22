import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../services/api';
import styles from './Footer.module.css';
import instagramLogo from '../../assets/instagram logo.png';
import linkedinLogo  from '../../assets/linkedin logo.png';
import facebookLogo  from '../../assets/facebook logo.png';
import subscribeIcon from '../../assets/subscribe.png';

function Footer() {
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error
  const [message, setMessage]   = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setEmail('');
      setStatus('success');
      setMessage('You\'re subscribed!');
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
          <button className={styles.btn} type="submit" disabled={status === 'loading'}>
            <img src={subscribeIcon} alt="" aria-hidden="true" width="20" height="20" />
            {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>

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
              <Link to="/projects">Projects</Link>
            </div>
          </div>
          <div className={styles.socials} aria-label="Social links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instagramLogo} alt="Instagram" width="20" height="20" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinLogo} alt="LinkedIn" width="20" height="20" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={facebookLogo} alt="Facebook" width="20" height="20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
