import { Link } from 'react-router-dom';
import styles from './GetInvolved.module.css';

function GetInvolved() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.body}>
          <h1>Get Involved</h1>
          <p>This page is coming soon. In the meantime, reach out and we'll get you connected.</p>
          <Link className={styles.btn} to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;
