import { useState, useRef } from 'react';
import { uploadImage } from '../../services/storage';
import styles from './ImageUpload.module.css';

function ImageUpload({ onUpload, folder = 'general', currentUrl = null, label = 'Upload Image' }) {
  const [preview, setPreview]   = useState(currentUrl);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef                = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setLoading(true);
    setProgress(0);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      // Simulate progress (Supabase doesn't expose upload progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const publicUrl = await uploadImage(file, folder);

      clearInterval(progressInterval);
      setProgress(100);
      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
      setPreview(currentUrl);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className={styles.wrap}>
      {label && <div className={styles.label}>{label}</div>}

      <div
        className={`${styles.dropzone} ${loading ? styles.loading : ''}`}
        onClick={() => !loading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        tabIndex={0}
        aria-label="Upload image"
      >
        {preview ? (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
            {!loading && (
              <div className={styles.previewOverlay}>
                <span>Click to change</span>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>📸</div>
            <p>Click or drag to upload</p>
            <span>JPEG, PNG, WebP, GIF — max 5MB</span>
          </div>
        )}

        {loading && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            <span className={styles.progressText}>Uploading... {progress}%</span>
          </div>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className={styles.hiddenInput}
        disabled={loading}
      />
    </div>
  );
}

export default ImageUpload;
