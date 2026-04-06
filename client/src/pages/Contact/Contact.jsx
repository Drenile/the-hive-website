import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './Contact.module.css';
import { submitContact } from '../../services/api';
import { trimFormFields } from '../../utils/sanitize';
import heroImg      from '../../assets/students-smiling.jpg';
import greenClip    from '../../assets/green-clip.png';
import pinkEmphasis from '../../assets/pink-upside-emphasis.png';

const reachCards = [
  { title: 'Email',     desc: 'thehive.club@uleth.ca',             btn: '✉ SEND',   href: 'mailto:thehive.club@uleth.ca' },
  { title: 'Discord',   desc: 'Join the community + ask questions', btn: '✉ JOIN',   href: 'https://discord.com/invite/KqNYtZuVM' },
  { title: 'Instagram', desc: 'Follow us on Instagram.',            btn: '✉ FOLLOW', href: 'https://www.instagram.com/thehive_official?igsh=a2k5YzVrbjd4bHpu&utm_source=qr' },
  { title: 'LinkedIn',  desc: 'Follow us on LinkedIn.',             btn: '✉ FOLLOW', href: 'https://www.linkedin.com/company/the-hiveclub/' },
];

function Contact() {
  const [form, setForm]           = useState({ name: '', email: '', reason: '', message: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState('');

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setError('Please consent to our Privacy Policy before submitting.');
      return;
    }
    setError('');
    setSending(true);
    try {
      await submitContact(trimFormFields({ name: form.name, email: form.email, reason: form.reason, message: form.message }));
      setForm({ name: '', email: '', reason: '', message: '', consent: false });
      setSubmitted(true);
    } catch (err) {
      setError(err.error || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}><img src={heroImg} alt="Students collaborating" /></div>
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroNav} ${styles.wrap}`} />
        <div className={`${styles.heroTitle} ${styles.wrap}`}>
          <h1>Contact Us</h1>
          <p>Got a project idea? Want to collaborate?</p>
        </div>
      </section>

      <section className={styles.quickReach}>
        <div className={styles.wrap}>
          <img className={`${styles.deco} ${styles.decoLeft}`}  src={pinkEmphasis} alt="" aria-hidden="true" />
          <img className={`${styles.deco} ${styles.decoRight}`} src={pinkEmphasis} alt="" aria-hidden="true" />
          <ScrollReveal><h2 className={styles.quickHeading}>Quick ways to reach us</h2></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className={styles.quickGrid}>
              {reachCards.map((card, i) => (
                <div key={i} className={styles.reachCard}>
                  <div className={styles.reachCardTitle}>{card.title}</div>
                  <div className={styles.reachCardDesc}>{card.desc}</div>
                  <a className={styles.reachCardBtn} href={card.href} target="_blank" rel="noopener noreferrer">{card.btn}</a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.formCard}>
              <img className={styles.formMouse} src={greenClip} alt="" aria-hidden="true" />
              <h2>Ready to work with us?</h2>
              <p className={styles.formSub}>Let's build something meaningful together</p>

              {submitted ? (
                <div className={styles.successCard}>
                  <div className={styles.successIcon}>✅</div>
                  <h3>Message sent!</h3>
                  <p>We'll get back to you soon.</p>
                  <button className={styles.submit} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <div className={styles.formInner}>
                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                      <label htmlFor="name">NAME</label>
                      <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email">EMAIL</label>
                      <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="reason">What are you reaching out about?</label>
                      <select id="reason" name="reason" value={form.reason} onChange={handleChange} required>
                        <option value="" disabled>Select an option</option>
                        <option value="join">Joining The Hive as a Student</option>
                        <option value="mentor">Becoming a Mentor</option>
                        <option value="partner">Partnering / Sponsoring</option>
                        <option value="project">Project Collaboration</option>
                        <option value="media">Media / Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="message">MESSAGE</label>
                      <textarea id="message" name="message" rows="5" placeholder="Tell us more..." value={form.message} onChange={handleChange} required />
                    </div>

                    {/* PIPA Consent */}
                    <div className={styles.consentField}>
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="consent">
                        I consent to The Hive collecting and using my personal information to respond to my inquiry, in accordance with our <Link to="/privacy" className={styles.consentLink}>Privacy Policy</Link>. I understand I can withdraw consent at any time.
                      </label>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    <button className={styles.submit} type="submit" disabled={sending || !form.consent}>
                      {sending ? 'Sending...' : '✉ SEND'}
                    </button>
                  </form>
                  <div className={styles.formRight}>
                    <a className={styles.formEmail} href="mailto:thehive.club@uleth.ca">thehive.club@uleth.ca</a>
                    <div className={styles.formSocials}>
                      <a href="https://www.instagram.com/thehive_official?igsh=a2k5YzVrbjd4bHpu&utm_source=qr" className={styles.formSocial} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                      </a>
                      <a href="https://www.linkedin.com/company/the-hiveclub/" className={styles.formSocial} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a href="https://discord.com/invite/KqNYtZuVM" className={styles.formSocial} aria-label="Discord" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.908 19.908 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default Contact;
