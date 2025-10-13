import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import SearchBar from './SearchBar';
import { redirectToSpotifyLogin } from '../SpotifyAccess';
import CloneButton from './CloneButton';
import CloneModal from './CloneModal';

function TrackSelector({ playlist, setPlaylist, needsLogin, setNeedsLogin }) {
    const [results, setResults] = useState([]);
    const [isCloneOpen, setIsCloneOpen] = useState(false);
    const [cloneUrl, setCloneUrl] = useState('');
    const [cloneLoading, setCloneLoading] = useState(false);
    const [cloneError, setCloneError] = useState(null);

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

    function extractPlaylistId(urlOrId) {
        if (!urlOrId) return null;
        // If user pasted the raw id
        if (/^[A-Za-z0-9]+$/.test(urlOrId)) return urlOrId;

        try {
            // spotify:playlist:ID
            const colonMatch = urlOrId.match(/spotify:playlist:([A-Za-z0-9]+)/);
            if (colonMatch) return colonMatch[1];

            // https://open.spotify.com/playlist/ID
            const webMatch = urlOrId.match(/playlist\/([A-Za-z0-9]+)/);
            if (webMatch) return webMatch[1];
        } catch (e) {
            return null;
        }
        return null;
    }

    async function handleCloneSubmit(e) {
        e && e.preventDefault();
        setCloneError(null);
        const playlistId = extractPlaylistId(cloneUrl.trim());
        if (!playlistId) {
            setCloneError('Could not find a playlist ID in that URL.');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsCloneOpen(false);
            setNeedsLogin(true);
            redirectToSpotifyLogin();
            return;
        }

        setCloneLoading(true);
        try {
            let tracks = [];
            let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;
            while (nextUrl) {
                const res = await fetch(nextUrl, { headers: { Authorization: `Bearer ${token}` } });
                if (res.status === 401) {
                    localStorage.removeItem('access_token');
                    setNeedsLogin(true);
                    setCloneError('Spotify token expired. Please log in again.');
                    break;
                }
                if (!res.ok) {
                    const errText = await res.text();
                    setCloneError(`Failed to fetch playlist: ${res.status} ${errText}`);
                    break;
                }
                const data = await res.json();
                const pageTracks = data.items.map(item => item.track).filter(Boolean);
                tracks = tracks.concat(pageTracks);
                nextUrl = data.next;
            }

            if (tracks.length > 0) {
                // Replace the current playlist with the cloned tracks
                setPlaylist(tracks);
                setIsCloneOpen(false);
                setCloneUrl('');
            } else if (!cloneError) {
                setCloneError('No tracks found in that playlist.');
            }
        } catch (err) {
            setCloneError(err.message || 'Unknown error while cloning playlist.');
        } finally {
            setCloneLoading(false);
        }
    }

    function handleAdd(song) {
        if (!playlist.some(s => s.id === song.id)) {
            setPlaylist([...playlist, song]);
        }
    }

    function handleRemove(song) {
        setPlaylist(playlist.filter(s => !(s.id === song.id)));
    }

    return (
        <section id="songs-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Search for your Fa<span className="clr-accent">vvv</span>'s</h2>
                <div>
                    <CloneButton onClick={() => setIsCloneOpen(true)} />
                </div>
            </div>
            <div>
                <SearchBar onResults={setResults} />
            </div>
            <div id="results">
                {results.map((song) => (
                    <SongCard
                        key={song.id}
                        title={song.name}
                        artist={song.artists}
                        album={song.album.name}
                        cover={song.album.images[0]?.url}
                        addedToPlaylist={playlist.some(s => s.id === song.id)}
                        onAdd={() => handleAdd(song)}
                        onRemove={() => handleRemove(song)}
                        playlistCard={false}
                    />
                ))}
            </div>

            <CloneModal
                open={isCloneOpen}
                url={cloneUrl}
                setUrl={setCloneUrl}
                onCancel={() => { setIsCloneOpen(false); setCloneError(null); }}
                onSubmit={handleCloneSubmit}
                error={cloneError}
                loading={cloneLoading}
            />
        </section>
    );
}

export default TrackSelector;