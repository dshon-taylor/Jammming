import React, { useState, useRef, useEffect } from 'react';
import styles from './SongCard.module.css';
import playlistStyles from './Playlist.module.css';

function SongCard({ title, artist, album, cover, addedToPlaylist, playlistCard, onAdd, onRemove, removing, somethingRemoving }) {
    const marqueeRef = useRef(null);
    const containerRef = useRef(null);

    const buttonClass = playlistCard ? `remove-from-playlist ${removing ? ' remove-animation' : ''}` : 'add-to-playlist';

    const handleClick = () => {
        if (somethingRemoving) return; // Disable all removal if any card is removing

        if (!playlistCard && !addedToPlaylist) {
            onAdd();
        } else if (!playlistCard && addedToPlaylist) {
            onRemove();
        } else if (playlistCard && addedToPlaylist) {
            onRemove();
        }
    };

    const cardClassName = [
        styles.songCard,
        playlistCard ? playlistStyles.playlistCard : '',
        !playlistCard && addedToPlaylist ? 'selected' : '',
        playlistCard && removing ? 'remove-entry-animation' : ''
    ].join(' ');

    return (
        <div className={cardClassName}>
            <img src={cover} title={`Album art for ${album} by ${artist[0].name}`} />
            <div className={styles.songInfo}>
                <h3>{title}</h3>
                <p>{artist.map(a => a.name).join(', ')} { !playlistCard ? <span className={styles.albumTitle}>| {album}</span>: ''}</p>
            </div>
            <span
                className={buttonClass}
                onClick={handleClick}
                style={removing ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
        </div>
    );
}

export default SongCard;