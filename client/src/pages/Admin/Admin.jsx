import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Admin.module.css';
import AdminOverview   from './sections/AdminOverview';
import AdminEvents     from './sections/AdminEvents';
import AdminArticles   from './sections/AdminArticles';
import AdminUsers      from './sections/AdminUsers';
import AdminContact    from './sections/AdminContact';
import AdminNewsletter from './sections/AdminNewsletter';
import AdminAuditLog   from './sections/AdminAuditLog';

const tabs = [
  { id: 'overview',   label: '📊 Overview'    },
  { id: 'events',     label: '📅 Events'      },
  { id: 'articles',   label: '📰 Articles'    },
  { id: 'users',      label: '👥 Users'       },
  { id: 'contact',    label: '✉️ Contact'     },
  { id: 'newsletter', label: '📧 Newsletter'  },
  { id: 'audit',      label: '🔍 Audit Log'   },
];

function Admin() {
  const { profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!profile || profile.role !== 'admin') return <Navigate to="/" replace />;

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':   return <AdminOverview />;
      case 'events':     return <AdminEvents />;
      case 'articles':   return <AdminArticles />;
      case 'users':      return <AdminUsers />;
      case 'contact':    return <AdminContact />;
      case 'newsletter': return <AdminNewsletter />;
      case 'audit':      return <AdminAuditLog />;
      default:           return <AdminOverview />;
    }
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.adminBadge}>🐝 Admin</div>
          <div className={styles.adminName}>{profile.full_name || profile.email}</div>
        </div>
        <nav className={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navBtn} ${activeTab === tab.id ? styles.navBtnActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        {renderTab()}
      </main>
    </div>
  );
}

export default Admin;
