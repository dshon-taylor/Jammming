import React, { useState } from 'react';
import mockData from '../../mockData.json';
import SongCard from './SongCard';

function TrackSelector() {
    const [songs, setSongs] = useState(mockData);
    const [searchInput, setSearchInput] = useState('');

    function handleSearch(event) {
        const value = event.target.value;
        setSearchInput(value);
        const searchResults = mockData.filter(song =>
            song.songName.toLowerCase().includes(value.toLowerCase()) ||
            song.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setSongs(searchResults);
    }

    return (
        <section id="songs-container">
            <div>
                <h2>Search for your Fa<span className="clr-accent">vvv</span>'s</h2>
                <form id="search-form" onSubmit={e => e.preventDefault()}>
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Enter a song or artist name..."
                        value={searchInput}
                        onChange={handleSearch}
                    />
                </form>
            </div>
            <div id="results">
                {songs.map((song, index) => (
                    <SongCard
                        key={index}
                        title={song.songName}
                        artist={song.fullName}
                        album={song.words}
                        cover={song.urlPicsumPhotos}
                        addedToPlaylist={false}
                    />
                ))}
            </div>
        </section>
    );
}

export default TrackSelector;