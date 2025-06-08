import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import SearchBar from './SearchBar';
import { redirectToSpotifyLogin } from '../SpotifyAccess';

function TrackSelector({ playlist, setPlaylist }) {
    const [results, setResults] = useState([]);
    const [needsLogin, setNeedsLogin] = useState(false);

    // Fetch popular tracks on mount
    useEffect(() => {
        async function fetchPopular() {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setNeedsLogin(true);
                return;
            }
            const playlistId = '1Cgey68pUlQGsCPI2wJuxr'; // USA Top 50 playlist ID
            const tracksRes = await fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=30`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(tracksRes);
            if (tracksRes.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('access_token');
                setNeedsLogin(true);
                return;
            }
            const tracksData = await tracksRes.json();
            // Map to track objects
            const tracks = tracksData.items.map(item => item.track);
            console.log('Fetched popular tracks:', tracks);
            setResults(tracks);
        }
        fetchPopular();
    }, []);

    function handleAdd(song) {
        if (!playlist.some(s => s.id === song.id)) {
            setPlaylist([...playlist, song]);
        }
    }

    function handleRemove(song) {
        setPlaylist(playlist.filter(
            s => !(s.id === song.id)
        ));
    }

    if (needsLogin) {
        return (
            <div>
                <p>Your Spotify session has expired.</p>
                <button onClick={redirectToSpotifyLogin}>Log in with Spotify</button>
            </div>
        );
    }

    return (
        <section id="songs-container">
            <div>
                <h2>Search for your Fa<span className="clr-accent">vvv</span>'s</h2>
                <SearchBar onResults={setResults} />
            </div>
            <div id="results">
                {results.map((song) => (
                    <SongCard
                        key={song.id}
                        title={song.name}
                        artist={song.artists.map(a => a.name).join(', ')}
                        album={song.album.name}
                        cover={song.album.images[0]?.url}
                        addedToPlaylist={playlist.some(s => s.id === song.id)}
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