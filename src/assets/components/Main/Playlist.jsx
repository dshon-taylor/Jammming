import React, { useState } from 'react';
import SongCard from './SongCard';
import Button from './Button';
import styles from './Playlist.module.css';

function Playlist({ playlist }) {
    const [playlistName, setPlaylistName] = useState(null);
    const [editing, setEditing] = useState(false);
    
    return (
        <section id="playlist-container">
            <div className={styles.playlistNameWrapper}>
                <input
                    type="text"
                    id="playListName"
                    placeholder="My Playyylist"
                    className={styles.playlistName}
                    value={playlistName}
                    onChange={e => setPlaylistName(e.target.value)}
                    onFocus={() => setEditing(true)}
                    onBlur={() => setEditing(false)}
                />
                {!playlistName && !editing ? <div className={styles.editIcon}></div> : null }
            </div>
            <div id="playlist">
                {playlist.map((song, index) => (
                    <SongCard
                        key={index}
                        title={song.songName}
                        artist={song.fullName}
                        album={song.words}
                        cover={song.urlPicsumPhotos}
                        addedToPlaylist={true}
                        playlistCard={true}
                    />
                ))}
            </div>
            <Button text="Addd to Spotify" />
        </section>
    );
}

export default Playlist;