import React from 'react';
import styles from './Clone.module.css';

export default function CloneModal({ open, url, setUrl, onCancel, onSubmit, error, loading }) {
  if (!open) return null;

  return (
    <div className={styles.cloneModal}>
      <form className={styles.cloneForm} onSubmit={onSubmit}>
        <h3>Clone an existing playlist</h3>
        <p>Paste the Spotify playlist URL or ID below. We'll copy its tracks into your playlist.</p>
        <input
          type="text"
          placeholder="https://open.spotify.com/playlist/..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        {error ? <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div> : null}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>{loading ? 'Cloning...' : 'Clone Playlist'}</button>
          <button type="button" onClick={onCancel} style={{ padding: '8px 12px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
