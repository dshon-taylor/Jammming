import React from 'react';
import styles from './Clone.module.css';

export default function CloneButton({ onClick }) {
  return (
    <button
      onClick={onClick} 
      className={styles.cloneButton}
      aria-label="Clone existing playlist"
    >
      Clone Existing Playlist
    </button>
  );
}
