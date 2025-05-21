import React, { useState } from 'react';
import styles from './SongCard.module.css';
import playlistStyles from './Playlist.module.css';

function SongCard({title, artist, album, cover, addedToPlaylist, playlistCard}) {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
    };
    const trackAdded = selected ? 'selected' : '';
    const buttonClass = addedToPlaylist ? 'remove-from-playlist' : 'add-to-playlist';
    return (
        <div className={`${styles.songCard} ${trackAdded} ${playlistCard ? playlistStyles.playlistCard : ''}`}>
            <img src={cover} title={`Album art for ${title} by ${artist}`} />
            <div className={styles.songInfo}>
                <h3>{title}</h3>
                <p>{artist} { addedToPlaylist ? '' : <span style={{opacity: .6}}>| {album}</span>}</p>
            </div>
            <span className={buttonClass} onClick={handleClick}></span>
        </div>
    );
}

export default SongCard;