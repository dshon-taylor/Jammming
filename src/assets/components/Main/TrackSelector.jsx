import React, { useState } from 'react';
import mockData from '../../mockData.json';
import SongCard from './SongCard';
import SearchBar from './SearchBar';

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
                <SearchBar onSearch={handleSearch} />
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