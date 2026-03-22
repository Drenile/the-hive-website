import { useState } from 'react';
import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './Contact.module.css';
import { submitContact } from '../../services/api';
import heroImg   from '../../assets/students smiling.jpg';
import greenClip from '../../assets/green clip.png';
import pinkEmphasis from '../../assets/pink upside empasis.png';

const reachCards = [
  { title: 'Email',     desc: 'thehive.club@uleth.ca',                btn: '✉ SEND',   href: 'mailto:thehive.club@uleth.ca' },
  { title: 'Discord',   desc: 'Join the community + ask questions',    btn: '✉ JOIN',   href: '#' },
  { title: 'Instagram', desc: 'Follow us on our social media platforms.', btn: '✉ FOLLOW', href: '#' },
  { title: 'LinkedIn',  desc: 'Follow us on our social media platforms.', btn: '✉ FOLLOW', href: '#' },
];

function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await submitContact(form);
      setForm({ name: '', email: '', reason: '', message: '' });
      setSubmitted(true);
    } catch (err) {
      setError(err.error || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}><img src={heroImg} alt="Students collaborating" /></div>
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroNav} ${styles.wrap}`} />
        <div className={`${styles.heroTitle} ${styles.wrap}`}>
          <h1>Contact Us</h1>
          <p>Got a project idea? Want to collaborate?</p>
        </div>
      </section>

      {/* ── QUICK REACH ── */}
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
                  <a className={styles.reachCardBtn} href={card.href} target={card.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer">{card.btn}</a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
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
                    {error && <div className={styles.error}>{error}</div>}
                    <button className={styles.submit} type="submit" disabled={sending}>
                      {sending ? 'Sending...' : '✉ SEND'}
                    </button>
                  </form>
                  <div className={styles.formRight}>
                    <a className={styles.formEmail} href="mailto:thehive.club@uleth.ca">thehive.club@uleth.ca</a>
                    <div className={styles.formSocials}>
                      <a href="#" className={styles.formSocial} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                      </a>
                      <a href="#" className={styles.formSocial} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a href="#" className={styles.formSocial} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
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
