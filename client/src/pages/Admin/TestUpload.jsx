import { useState } from 'react';
import ImageUpload from '../../components/shared/ImageUpload';

function TestUpload() {
  const [url, setUrl] = useState('');

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 24px' }}>
      <h1 style={{ marginBottom: 32 }}>Image Upload Test</h1>
      <ImageUpload
        folder="test"
        label="Test Image Upload"
        onUpload={(publicUrl) => {
          console.log('Uploaded:', publicUrl);
          setUrl(publicUrl);
        }}
      />
      {url && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 13, opacity: .6, marginBottom: 8 }}>Public URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, wordBreak: 'break-all' }}>{url}</a>
        </div>
      )}
    </div>
  );
}

export default TestUpload;
