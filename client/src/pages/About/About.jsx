import ScrollReveal from '../../components/shared/ScrollReveal';
import styles from './About.module.css';

import yellowDoodle    from '../../assets/yellow-doodle.png';
import pinkDoodleHollow from '../../assets/pink-doodle-hollow.png';
import pinkDoodle      from '../../assets/pink-doodle.png';
import greenClip       from '../../assets/green-clip.png';
import greenPuzzle     from '../../assets/green-puzzle.png';
import yellowSuitcase  from '../../assets/yellow-suitcase.png';

import photo1 from '../../assets/hands-together-laptop.jpg';
import photo2 from '../../assets/leadfest-3-smile.jpg';
import photo3 from '../../assets/IMG_0943.JPG';
import photo4 from '../../assets/IMG_0915.JPG';

import storyImg   from '../../assets/students-smiling.jpg';
import missionImg from '../../assets/hiver3.jpg';
import visionImg  from '../../assets/IMG_4270.jpg';

import teamsIcon     from '../../assets/teams.png';
import projectsIcon  from '../../assets/projects.png';
import mentorIcon    from '../../assets/mentor.png';
import communityIcon from '../../assets/community.png';

import face    from '../../assets/face-portrait.png';
import hiver1  from '../../assets/hiver1.jpg';
import hiver2  from '../../assets/hiver2.jpg';
import hiver3  from '../../assets/hiver3.jpg';
import img0943 from '../../assets/IMG_0943.JPG';
import img0915 from '../../assets/IMG_0915.JPG';
import leadfest from '../../assets/leadfest-3-smile.jpg';

const teamMembers = [
  { img: face,    name: 'Victoria Morgas', role: 'Queen Bee' },
  { img: hiver1,  name: 'Adeola Owo',      role: 'Vice President' },
  { img: hiver2,  name: 'Adeola Owo',      role: 'Vice President' },
  { img: hiver3,  name: 'Adeola Owo',      role: 'Vice President' },
  { img: img0943, name: 'Adeola Owo',      role: 'Vice President' },
  { img: img0915, name: 'Adeola Owo',      role: 'Vice President' },
  { img: leadfest,name: 'Adeola Owo',      role: 'Vice President' },
];

const workCards = [
  { icon: teamsIcon,     title: 'Cross-functional teams',      desc: 'Students collaborate across different skills and roles.' },
  { icon: projectsIcon,  title: 'Real-world projects',         desc: 'Work on hands-on projects that mirror professional environments.' },
  { icon: mentorIcon,    title: 'Mentorship and peer learning', desc: 'Learn with support from mentors and fellow students.' },
  { icon: communityIcon, title: 'Community-driven growth',     desc: 'Skills and confidence are built through doing, not just theory.' },
];

function About() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroDoodleWrap}>
          <img className={styles.heroDoodle} src={yellowDoodle} alt="" aria-hidden="true" />
        </div>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.heroText}>
              <h1>About The Hive</h1>
              <p>The Hive is a student-led community built around collaboration, real experience, and meaningful growth.</p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2} className={styles.photos}>
          {[photo1, photo2, photo3, photo4].map((src, i) => (
            <div key={i} className={styles.photo}>
              <img src={src} alt="" />
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* ── PAGE MIDDLE ── */}
      <div className={styles.pageMiddle}>
        <img className={styles.pageDoodle} src={pinkDoodleHollow} alt="" aria-hidden="true" />

        {/* Our Story */}
        <section className={styles.ourStory}>
          <img className={`${styles.deco} ${styles.decoPinkBlobStory}`} src={pinkDoodle} alt="" aria-hidden="true" />
          <div className={styles.wrap}>
            <div className={styles.twoCol}>
              <ScrollReveal className={styles.textBlock}>
                <img className={`${styles.deco} ${styles.decoPencil}`} src={greenClip} alt="" aria-hidden="true" />
                <div className={styles.kicker}>✦ Our Story</div>
                <h2>Our Story</h2>
                <p>The Hive began with a student stuck in the same loop many of us know too well — you need experience to get an internship, but you need an internship to get experience.</p>
                <p>When she finally landed an interview, she realized she wasn't ready. Her "training" came from YouTube videos, random notes, and tools she'd only used on her own. She knew the ideas — but not how they worked in practice. She wasn't lazy. She wasn't unmotivated. She was just learning alone.</p>
                <p>So The Hive was created to change that. A space where students could work on real projects, learn in teams, and build confidence before stepping into professional spaces.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className={styles.imgCard}>
                <img src={storyImg} alt="Students smiling together" />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className={styles.ourMission}>
          <div className={styles.wrap}>
            <div className={styles.twoCol}>
              <ScrollReveal className={`${styles.imgCard} ${styles.imgLeft}`}>
                <img src={missionImg} alt="Hive members collaborating" />
              </ScrollReveal>
              <ScrollReveal delay={0.2} className={styles.textBlock}>
                <div className={styles.kicker}>✦ Our Mission</div>
                <h2>Our Mission</h2>
                <p>Our mission is simple: give students real experience, real confidence, and real connections.</p>
                <p>We do this by working in cross-functional teams, learning from professionals, and creating a space where exploring career paths feels safe, supported, and exciting.</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className={styles.ourVision}>
          <div className={styles.wrap}>
            <div className={styles.twoCol}>
              <ScrollReveal className={styles.textBlock}>
                <img className={`${styles.deco} ${styles.decoSuitcase}`} src={yellowSuitcase} alt="" aria-hidden="true" />
                <div className={styles.kicker}>✦ Our Vision</div>
                <h2>Our Vision</h2>
                <p>We imagine a future where students don't have to choose between learning and experience.</p>
                <p>A future where collaboration replaces competition, and career growth starts before graduation — not after.</p>
                <p>The Hive aims to be a launchpad where students feel prepared to step into professional spaces without feeling lost, unqualified, or alone.</p>
                <img className={`${styles.deco} ${styles.decoPuzzle}`} src={greenPuzzle} alt="" aria-hidden="true" />
              </ScrollReveal>
              <ScrollReveal delay={0.2} className={styles.imgCard}>
                <img src={visionImg} alt="Hive members at an event" />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className={styles.howWeWork}>
          <img className={`${styles.deco} ${styles.decoPinkBlobWork}`} src={pinkDoodle} alt="" aria-hidden="true" />
          <div className={styles.wrap}>
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <h2>How We Work</h2>
                <p>Our approach centers on working together, learning through experience, and supporting one another as we grow.</p>
              </div>
            </ScrollReveal>
            <div className={styles.workGrid}>
              {workCards.map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={styles.workCard}>
                    <div className={styles.workIcon}>
                      <img src={card.icon} alt="" aria-hidden="true" />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── MEET THE TEAM ── */}
      <section className={styles.meetTeam}>
        <div className={styles.wrap}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <h2>Meet The Team</h2>
              <p>The people behind The Hive — students leading, building, and growing together.</p>
            </div>
          </ScrollReveal>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} delay={(i % 4) * 0.1}>
                <div className={styles.teamCard}>
                  <div className={styles.teamImg}>
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className={styles.teamName}>{member.name}</div>
                  <div className={styles.teamRole}>{member.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
