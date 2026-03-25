import { useState, useEffect } from 'react';
import { getAllProfiles, updateUserRole } from '../../../services/api';
import styles from './AdminSection.module.css';

const roles = ['member', 'mentor', 'partner', 'admin'];

function AdminUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllProfiles();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    if (!confirm(`Change this user's role to ${role}?`)) return;
    setUpdating(id);
    try {
      await updateUserRole(id, role);
      await fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    } finally {
      setUpdating(null);
    }
  };

  const roleColors = { admin: 'pink', mentor: 'green', partner: 'yellow', member: 'grey' };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
        <span className={styles.count}>{users.length} total</span>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Change Role</span>
          </div>
          {users.map(user => (
            <div key={user.id} className={styles.tableRow}>
              <span className={styles.tableTitle}>{user.full_name || '—'}</span>
              <span className={styles.tableMeta}>{user.email}</span>
              <span><span className={`${styles.badge} ${styles[`badge--${roleColors[user.role]}`]}`}>{user.role}</span></span>
              <span className={styles.tableActions}>
                <select
                  value={user.role}
                  disabled={updating === user.id}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                  className={styles.roleSelect}
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
