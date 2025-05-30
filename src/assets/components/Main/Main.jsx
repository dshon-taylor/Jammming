import React from 'react';
import TrackSelector from './TrackSelector';
import Playlist from './Playlist';
import mockData from '../../mockData.json';

function Main() {
    return (
        <main>
            <div className="wrapper">
                <TrackSelector />
                <Playlist playlist={mockData} />
            </div>
        </main>
    )
}

export default Main;

    