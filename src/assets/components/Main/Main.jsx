import React from 'react';
import TrackSelector from './TrackSelector';
import Playlist from './Playlist';

function Main({ playlist, setPlaylist, songs }) {
    return (
        <main>
            <div className="wrapper">
                <TrackSelector playlist={playlist} setPlaylist={setPlaylist} />
                <Playlist playlist={playlist} setPlaylist={setPlaylist} />
            </div>
        </main>
    )
}

export default Main;

    