import React, { useEffect, useState } from 'react';
import styles from './SongCard.module.css';
import playlistStyles from './Playlist.module.css';

function SongCard({title, artist, album, cover, addedToPlaylist, playlistCard, onAdd, onRemove}) {

    const [removing, setRemoving] = useState(false);

    const buttonClass = playlistCard ? `remove-from-playlist ${playlistCard && removing ? ' remove-animation' : ''}` : 'add-to-playlist';

    const handleClick = () => {
        if (removing) return;

        if (!playlistCard && !addedToPlaylist) {
            onAdd();
        } else if (!playlistCard && addedToPlaylist) {
            onRemove();
        } else if (addedToPlaylist) {
            setRemoving(true);
            setTimeout( () => {
                onRemove()
            }, 500);
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
            <img src={cover} title={`Album art for ${title} by ${artist}`} />
            <div className={styles.songInfo}>
                <h3>{title}</h3>
                <p>{artist} { !playlistCard ? <span className={styles.albumTitle}>| {album}</span>: ''}</p>
            </div>
            <span
                className={buttonClass}
                onClick={handleClick}
                style={removing ? { pointerEvents: 'none' } : {}}
            />
        </div>
    );
}

export default SongCard;