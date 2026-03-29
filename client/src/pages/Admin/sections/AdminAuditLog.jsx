import { useState, useEffect } from 'react';
import { getAuthToken } from '../../../utils/getAuthToken';
import styles from './AdminSection.module.css';
import auditStyles from './AdminAuditLog.module.css';

const ACTION_COLORS = {
  CREATE:      'green',
  UPDATE:      'yellow',
  DELETE:      'cancelled',
  ROLE_CHANGE: 'pink',
  LOGIN:       'upcoming',
  LOGOUT:      'grey',
};

const ACTION_ICONS = {
  CREATE:      '✦',
  UPDATE:      '✎',
  DELETE:      '✕',
  ROLE_CHANGE: '⟳',
  LOGIN:       '→',
  LOGOUT:      '←',
};

function AdminAuditLog() {
  const [logs, setLogs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [expanded, setExpanded]   = useState(null);
  const [filter, setFilter]       = useState({ entity_type: '', action: '' });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token  = await getAuthToken();
      const params = new URLSearchParams();
      if (filter.entity_type) params.append('entity_type', filter.entity_type);
      if (filter.action)      params.append('action', filter.action);
      params.append('limit', '50');

      const res    = await fetch(`${import.meta.env.VITE_API_URL}/audit-logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { data } = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [filter]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Audit Log</h1>
        <span className={styles.count}>{logs.length} entries</span>
      </div>
      <p className={styles.pageSub}>A record of all admin actions taken on The Hive platform.</p>

      {/* Filters */}
      <div className={auditStyles.filters}>
        <select
          className={auditStyles.filterSelect}
          value={filter.entity_type}
          onChange={e => setFilter(p => ({ ...p, entity_type: e.target.value }))}
        >
          <option value="">All entities</option>
          <option value="event">Events</option>
          <option value="article">Articles</option>
          <option value="user">Users</option>
          <option value="profile">Profiles</option>
          <option value="contact">Contact</option>
        </select>

        <select
          className={auditStyles.filterSelect}
          value={filter.action}
          onChange={e => setFilter(p => ({ ...p, action: e.target.value }))}
        >
          <option value="">All actions</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
          <option value="ROLE_CHANGE">Role Change</option>
        </select>

        <button className={styles.btnSecondary} onClick={() => setFilter({ entity_type: '', action: '' })}>
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading audit log...</div>
      ) : logs.length === 0 ? (
        <div className={styles.empty}>No audit log entries found.</div>
      ) : (
        <div className={auditStyles.logList}>
          {logs.map(log => (
            <div key={log.id} className={auditStyles.logEntry}>
              <div
                className={auditStyles.logHeader}
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              >
                <div className={auditStyles.logLeft}>
                  <span className={`${auditStyles.actionBadge} ${auditStyles[`action--${ACTION_COLORS[log.action] || 'grey'}`]}`}>
                    {ACTION_ICONS[log.action]} {log.action}
                  </span>
                  <div className={auditStyles.logInfo}>
                    <span className={auditStyles.logEntity}>{log.entity_type}</span>
                    <span className={auditStyles.logUser}>{log.user_email || 'System'}</span>
                  </div>
                </div>
                <div className={auditStyles.logRight}>
                  <span className={auditStyles.logDate}>{formatDate(log.created_at)}</span>
                  <span className={auditStyles.logChevron}>{expanded === log.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === log.id && (
                <div className={auditStyles.logBody}>
                  <div className={auditStyles.logMeta}>
                    <div><strong>User:</strong> {log.user_email || '—'}</div>
                    <div><strong>Entity:</strong> {log.entity_type}</div>
                    <div><strong>Entity ID:</strong> {log.entity_id || '—'}</div>
                    <div><strong>IP:</strong> {log.ip_address || '—'}</div>
                  </div>

                  {log.old_data && (
                    <div className={auditStyles.logData}>
                      <div className={auditStyles.logDataLabel}>Before</div>
                      <pre className={auditStyles.logDataPre}>
                        {JSON.stringify(log.old_data, null, 2)}
                      </pre>
                    </div>
                  )}

                  {log.new_data && (
                    <div className={auditStyles.logData}>
                      <div className={auditStyles.logDataLabel}>After</div>
                      <pre className={auditStyles.logDataPre}>
                        {JSON.stringify(log.new_data, null, 2)}
                      </pre>
                    </div>
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

export default AdminAuditLog;
