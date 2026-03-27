import { useState, useEffect } from 'react';
import { getAuthToken } from '../../../utils/getAuthToken';
import styles from './AdminSection.module.css';

function AdminContact() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [expanded, setExpanded]       = useState(null);

  const fetchSubmissions = async () => {
    try {
      const token = await getAuthToken();
      const res   = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { data } = await res.json();
      setSubmissions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      const token = await getAuthToken();
      await fetch(`${import.meta.env.VITE_API_URL}/contact/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const unread = submissions.filter(s => !s.read).length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contact Submissions</h1>
        {unread > 0 && <span className={styles.unreadBadge}>{unread} unread</span>}
      </div>

      {loading ? (
        <div className={styles.loading}>Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className={styles.empty}>No contact submissions yet.</div>
      ) : (
        <div className={styles.submissionList}>
          {submissions.map(s => (
            <div key={s.id} className={`${styles.submissionCard} ${!s.read ? styles.submissionUnread : ''}`}>
              <div className={styles.submissionHeader} onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                <div>
                  <span className={styles.submissionName}>{s.name}</span>
                  <span className={styles.submissionEmail}>{s.email}</span>
                </div>
                <div className={styles.submissionMeta}>
                  {s.reason && <span className={styles.badge}>{s.reason}</span>}
                  <span className={styles.tableMeta}>{new Date(s.created_at).toLocaleDateString()}</span>
                  {!s.read && <span className={styles.unreadDot} />}
                </div>
              </div>
              {expanded === s.id && (
                <div className={styles.submissionBody}>
                  <p>{s.message}</p>
                  {!s.read && (
                    <button className={styles.btnSecondary} onClick={() => markRead(s.id)}>Mark as Read</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminContact;
