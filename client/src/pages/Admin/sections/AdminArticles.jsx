import { useState, useEffect } from 'react';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../../../services/api';
import ImageUpload from '../../../components/shared/ImageUpload';
import ConfirmModal from '../../../components/shared/ConfirmModal';
import styles from './AdminSection.module.css';

const emptyForm = { title: '', excerpt: '', content: '', image_url: '', tag: 'event', published: false };

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [confirm, setConfirm]   = useState({ open: false, id: null });

  const fetchArticles = async () => {
    try {
      const { data } = await getArticles();
      setArticles(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleEdit = (article) => {
    setEditing(article.id);
    setForm({
      title:     article.title     || '',
      excerpt:   article.excerpt   || '',
      content:   article.content   || '',
      image_url: article.image_url || '',
      tag:       article.tag       || 'event',
      published: article.published || false,
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
        await updateArticle(editing, form);
      } else {
        await createArticle(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      await fetchArticles();
    } catch (err) {
      setError(err.error || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick  = (id) => setConfirm({ open: true, id });

  const handleDeleteConfirm = async () => {
    try {
      await deleteArticle(confirm.id);
      setConfirm({ open: false, id: null });
      await fetchArticles();
    } catch (err) {
      setError('Failed to delete article');
      setConfirm({ open: false, id: null });
    }
  };

  const tagColors = { spotlight: 'green', event: 'pink', resource: 'yellow' };

  return (
    <div>
      <ConfirmModal
        isOpen={confirm.open}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone and will be recorded in the audit log."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirm({ open: false, id: null })}
        danger
      />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Articles</h1>
        <button className={styles.btnPrimary} onClick={handleNew}>+ New Article</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{editing ? 'Edit Article' : 'New Article'}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Title *</label>
                <input maxLength={200} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className={styles.field}>
                <label>Tag</label>
                <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}>
                  <option value="event">Event Recap</option>
                  <option value="spotlight">Spotlight</option>
                  <option value="resource">Resource</option>
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Excerpt</label>
              <textarea rows="2" value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label>Content</label>
              <textarea rows="6" value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} />
            </div>
            <ImageUpload folder="articles" label="Article Image" currentUrl={form.image_url} onUpload={(url) => setForm(p => ({ ...p, image_url: url }))} />
            <div className={styles.checkboxField}>
              <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} />
              <label htmlFor="published">Publish immediately</label>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>{saving ? 'Saving...' : 'Save Article'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Loading articles...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Title</span><span>Tag</span><span>Status</span><span>Actions</span>
          </div>
          {articles.length === 0 ? (
            <div className={styles.empty}>No articles yet. Create your first one!</div>
          ) : articles.map(article => (
            <div key={article.id} className={styles.tableRow}>
              <span className={styles.tableTitle}>{article.title}</span>
              <span><span className={`${styles.badge} ${styles[`badge--${tagColors[article.tag]}`]}`}>{article.tag}</span></span>
              <span><span className={`${styles.badge} ${article.published ? styles['badge--upcoming'] : styles['badge--cancelled']}`}>{article.published ? 'Published' : 'Draft'}</span></span>
              <span className={styles.tableActions}>
                <button className={styles.btnEdit} onClick={() => handleEdit(article)}>Edit</button>
                <button className={styles.btnDelete} onClick={() => handleDeleteClick(article.id)}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminArticles;
