import React, { useEffect, useState } from 'react';
import styles from './SongCard.module.css';
import playlistStyles from './Playlist.module.css';

function SongCard({title, artist, album, cover, addedToPlaylist, playlistCard, onAdd, onRemove}) {

    const buttonClass = playlistCard ? 'remove-from-playlist' : 'add-to-playlist';

    const handleClick = () => {
        if (!playlistCard && !addedToPlaylist) {
            onAdd();
        } else if (addedToPlaylist) {
            onRemove();
        }
    };

    const cardClassName = [
        styles.songCard,
        playlistCard ? playlistStyles.playlistCard : '',
        !playlistCard && addedToPlaylist ? 'selected' : ''
    ].join(' ');

    return (
        <div className={cardClassName}>
            <img src={cover} title={`Album art for ${title} by ${artist}`} />
            <div className={styles.songInfo}>
                <h3>{title}</h3>
                <p>{artist} { addedToPlaylist ? '' : <span className={styles.albumTitle}>| {album}</span>}</p>
            </div>
            <span className={buttonClass} onClick={handleClick}></span>
        </div>
    );
}

export default SongCard;