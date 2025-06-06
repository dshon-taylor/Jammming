import React, { useState } from 'react';
import SongCard from './SongCard';
import Button from './Button';
import styles from './Playlist.module.css';

function Playlist({ playlist, setPlaylist }) {
    const [playlistName, setPlaylistName] = useState(null);
    const [editing, setEditing] = useState(false);
    const [removingId, setRemovingId] = useState(null);
    const [somethingRemoving, setSomethingRemoving] = useState(false);
    
    function handleRemove(song) {
        if (somethingRemoving) return; // Prevent multiple removals at once
        setSomethingRemoving(true);
        setRemovingId(song.id);
        setTimeout(() => {
            setPlaylist(playlist.filter(
                s => s.id !== song.id
            ));
        setRemovingId(null);
        setSomethingRemoving(false);
        }, 500);
    }

    function savePlaylist() {
        playlist
    }

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
                    required
                />
                {!playlistName && !editing ? <div className={styles.editIcon}></div> : null }
            </div>
            <div id="playlist">
                {playlist.map((song) => (
                    <SongCard
                        key={song.id}
                        title={song.songName}
                        artist={song.fullName}
                        album={song.words}
                        cover={song.urlPicsumPhotos}
                        addedToPlaylist={true}
                        playlistCard={true}
                        onRemove={() => handleRemove(song)}
                        removing={removingId === song.id}
                        somethingRemoving={somethingRemoving}
                    />
                ))}
            </div>
            <Button text="Addd to Spotify" />
        </section>
    );
}

export default Playlist;