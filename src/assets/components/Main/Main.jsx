import React from 'react';
import TrackSelector from './TrackSelector';
import Playlist from './Playlist';

function Main({ playlist, setPlaylist, needsLogin, setNeedsLogin }) {
    return (
        <main>
            <div className="wrapper">
                <TrackSelector playlist={playlist} setPlaylist={setPlaylist} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin} />
                <Playlist playlist={playlist} setPlaylist={setPlaylist} />
            </div>
        </main>
    )
}

export default Main;

    