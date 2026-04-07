import { useState, useEffect } from 'react';
import { getAllProfiles, updateUserRole } from '../../../services/api';
import ConfirmModal from '../../../components/shared/ConfirmModal';
import styles from './AdminSection.module.css';

const roles = ['member', 'mentor', 'partner', 'admin'];

function AdminUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState({ open: false, userId: null, newRole: null, userName: '' });

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

  const handleRoleClick = (user, newRole) => {
    if (user.role === newRole) return;
    setConfirm({
      open: true,
      userId: user.id,
      newRole,
      userName: user.full_name || user.email,
      oldRole: user.role,
    });
  };

  const handleRoleConfirm = async () => {
    try {
      await updateUserRole(confirm.userId, confirm.newRole);
      setConfirm({ open: false, userId: null, newRole: null, userName: '' });
      await fetchUsers();
    } catch (err) {
      alert('Failed to update role');
      setConfirm({ open: false, userId: null, newRole: null, userName: '' });
    }
  };

  const roleColors = { admin: 'pink', mentor: 'green', partner: 'yellow', member: 'grey' };

  return (
    <div>
      <ConfirmModal
        isOpen={confirm.open}
        title="Change User Role"
        message={`Change ${confirm.userName}'s role from "${confirm.oldRole}" to "${confirm.newRole}"? This will immediately change what they can access on the platform and will be recorded in the audit log.`}
        confirmLabel="Change Role"
        onConfirm={handleRoleConfirm}
        onCancel={() => setConfirm({ open: false, userId: null, newRole: null, userName: '' })}
        danger={confirm.newRole === 'admin'}
      />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
        <span className={styles.count}>{users.length} total</span>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Name</span><span>Email</span><span>Role</span><span>Change Role</span>
          </div>
          {users.map(user => (
            <div key={user.id} className={styles.tableRow}>
              <span className={styles.tableTitle}>{user.full_name || '—'}</span>
              <span className={styles.tableMeta}>{user.email}</span>
              <span><span className={`${styles.badge} ${styles[`badge--${roleColors[user.role]}`]}`}>{user.role}</span></span>
              <span className={styles.tableActions}>
                <select
                  value={user.role}
                  onChange={e => handleRoleClick(user, e.target.value)}
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
