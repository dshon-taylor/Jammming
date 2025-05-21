import React from 'react';
import TrackSelector from './TrackSelector';
import Playlist from './Playlist';

function Main() {
    return (
        <main>
            <div className="wrapper">
                <TrackSelector />
                <Playlist />
            </div>
        </main>
    )
}

export default Main;

    