import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/shared/ScrollReveal';
import styles from './GetInvolvedSection.module.css';
import hiverImg   from '../../../assets/hands together laptop.jpg';
import mentorImg  from '../../../assets/leadfest 3 smile.JPG';
import partnerImg from '../../../assets/IMG_4270.jpg';

const roles = [
  {
    id:      'hiver',
    label:   'Hiver',
    color:   'green',
    img:     hiverImg,
    imgAlt:  'Students collaborating',
    desc:    'We partner with organizations to deliver hands-on experience to students through real projects in design, marketing & development.',
    btnClass: 'btnGreen',
  },
  {
    id:      'mentor',
    label:   'Mentor',
    color:   'pink',
    img:     mentorImg,
    imgAlt:  'Mentor guiding students',
    desc:    'Share your experience, guide students, and help shape real-world learning in a community that values your expertise.',
    btnClass: 'btnYellow',
  },
  {
    id:      'partner',
    label:   'Partner',
    color:   'yellow',
    img:     partnerImg,
    imgAlt:  'Partner organization',
    desc:    'Support student-led projects, events, and initiatives that create real impact while connecting your organization with emerging talent.',
    btnClass: 'btnPink',
  },
];

function GetInvolvedSection() {
  const [active, setActive] = useState('hiver');
  const activeRole = roles.find(r => r.id === active);

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <h2 className={styles.heading}>Get Involved</h2>
        </ScrollReveal>

        {/* Tab switcher — desktop only */}
        <ScrollReveal delay={0.1}>
          <div className={styles.tabs} role="tablist" aria-label="Join as">
            {roles.map(role => (
              <button
                key={role.id}
                className={`${styles.tab} ${styles[`tab--${role.color}`]} ${active === role.id ? styles.isActive : ''}`}
                role="tab"
                aria-selected={active === role.id}
                onClick={() => setActive(role.id)}
              >
                {role.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Desktop: active panel only */}
        <ScrollReveal delay={0.2} className={styles.desktopPanel}>
          <div className={`${styles.panel} ${styles[`panel--${activeRole.color}`]}`}>
            <div className={styles.panelInner}>
              <div className={styles.panelImg}>
                <img src={activeRole.img} alt={activeRole.imgAlt} />
              </div>
              <div className={styles.panelBody}>
                <div className={styles.panelKicker}>Join as a</div>
                <div className={styles.panelTitle}>{activeRole.label}</div>
                <p>{activeRole.desc}</p>
                <Link className={`${styles.btn} ${styles[activeRole.btnClass]}`} to="/get-involved">Join Us</Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile: all panels stacked */}
        <div className={styles.mobilePanels}>
          {roles.map(role => (
            <div key={role.id} className={`${styles.panel} ${styles[`panel--${role.color}`]}`}>
              <div className={styles.mobileHeader}>{`Join As A ${role.label}`}</div>
              <div className={styles.panelInner}>
                <div className={styles.panelImg}>
                  <img src={role.img} alt={role.imgAlt} />
                </div>
                <div className={styles.panelBody}>
                  <p>{role.desc}</p>
                  <Link className={`${styles.btn} ${styles[role.btnClass]}`} to="/get-involved">Join Us</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetInvolvedSection;
