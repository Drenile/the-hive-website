import { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../../services/api';
import ImageUpload from '../../../components/shared/ImageUpload';
import styles from './AdminSection.module.css';

const emptyForm = { title: '', description: '', event_date: '', location: '', image_url: '', tag: '', status: 'upcoming' };

function AdminEvents() {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  const fetchEvents = async () => {
    try {
      const [upcoming, past] = await Promise.all([
        getEvents({ status: 'upcoming' }),
        getEvents({ status: 'past' }),
      ]);
      setEvents([...(upcoming.data || []), ...(past.data || [])]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (event) => {
    setEditing(event.id);
    setForm({
      title:       event.title       || '',
      description: event.description || '',
      event_date:  event.event_date ? event.event_date.slice(0, 16) : '',
      location:    event.location    || '',
      image_url:   event.image_url   || '',
      tag:         event.tag         || '',
      status:      event.status      || 'upcoming',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editing) {
        await updateEvent(editing, form);
      } else {
        await createEvent(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      await fetchEvents();
    } catch (err) {
      setError(err.error || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await deleteEvent(id);
      await fetchEvents();
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Events</h1>
        <button className={styles.btnPrimary} onClick={handleNew}>+ New Event</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{editing ? 'Edit Event' : 'New Event'}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className={styles.field}>
                <label>Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Date & Time</label>
                <input type="datetime-local" value={form.event_date} onChange={e => setForm(p => ({ ...p, event_date: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Location</label>
                <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Tag</label>
                <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}>
                  <option value="">Select tag</option>
                  <option value="networking">Networking</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="community">Community</option>
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Description</label>
              <textarea rows="3" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <ImageUpload
              folder="events"
              label="Event Image"
              currentUrl={form.image_url}
              onUpload={(url) => setForm(p => ({ ...p, image_url: url }))}
            />
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>{saving ? 'Saving...' : 'Save Event'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Loading events...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          {events.length === 0 ? (
            <div className={styles.empty}>No events yet. Create your first one!</div>
          ) : events.map(ev => (
            <div key={ev.id} className={styles.tableRow}>
              <span className={styles.tableTitle}>{ev.title}</span>
              <span><span className={`${styles.badge} ${styles[`badge--${ev.status}`]}`}>{ev.status}</span></span>
              <span className={styles.tableMeta}>{ev.event_date ? new Date(ev.event_date).toLocaleDateString() : '—'}</span>
              <span className={styles.tableActions}>
                <button className={styles.btnEdit} onClick={() => handleEdit(ev)}>Edit</button>
                <button className={styles.btnDelete} onClick={() => handleDelete(ev.id)}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEvents;
