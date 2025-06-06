import React, { useState } from 'react';
import SongCard from './SongCard';
import SearchBar from './SearchBar';

function TrackSelector({ songs, playlist, setPlaylist }) {
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [searchInput, setSearchInput] = useState('');

    function handleSearch(event) {
        const value = event.target.value;
        setSearchInput(value);
        const searchResults = songs.filter(song =>
            song.songName.toLowerCase().includes(value.toLowerCase()) ||
            song.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSongs(searchResults);
    }

    function handleAdd(song) {
        if (!playlist.some(s => s.songName === song.songName && s.fullName === song.fullName)) {
            setPlaylist([...playlist, song]);
        }
    }

    function handleRemove(song) {
        setPlaylist(playlist.filter(
            s => !(s.songName === song.songName && s.fullName === song.fullName)
        ));
    }

    return (
        <section id="songs-container">
            <div>
                <h2>Search for your Fa<span className="clr-accent">vvv</span>'s</h2>
                <SearchBar onSearch={handleSearch} searchValue={searchInput} />
            </div>
            <div id="results">
                {filteredSongs.map((song) => (
                    <SongCard
                        key={song.id}
                        title={song.songName}
                        artist={song.fullName}
                        album={song.words}
                        cover={song.urlPicsumPhotos}
                        addedToPlaylist={playlist.some(
                            s => s.songName === song.songName && s.fullName === song.fullName
                        )}
                        onAdd={() => handleAdd(song)}
                        onRemove={() => handleRemove(song)}
                        playlistCard={false}
                    />
                ))}
            </div>
        </section>
    );
}

export default TrackSelector;