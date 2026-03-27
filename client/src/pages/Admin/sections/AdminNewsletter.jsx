import { useState, useEffect } from 'react';
import { getAuthToken } from '../../../utils/getAuthToken';
import styles from './AdminSection.module.css';

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = await getAuthToken();
        const res   = await fetch(`${import.meta.env.VITE_API_URL}/newsletter`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { data } = await res.json();
        setSubscribers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Newsletter Subscribers</h1>
        <span className={styles.count}>{subscribers.length} subscribers</span>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading subscribers...</div>
      ) : subscribers.length === 0 ? (
        <div className={styles.empty}>No subscribers yet.</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Email</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          {subscribers.map(sub => (
            <div key={sub.id} className={styles.tableRow}>
              <span className={styles.tableTitle}>{sub.email}</span>
              <span><span className={`${styles.badge} ${sub.subscribed ? styles['badge--upcoming'] : styles['badge--cancelled']}`}>{sub.subscribed ? 'Active' : 'Unsubscribed'}</span></span>
              <span className={styles.tableMeta}>{new Date(sub.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNewsletter;
