import React from 'react';
import mockData from '../../mockData.json';
import SongCard from './SongCard';


function Playlist() {
    return (
        <section id="playlist-container">
            <h2>Your Pla<span className="clr-accent">yyy</span>list</h2>
            <div id="playlist">
                {mockData.map((song, index) => (
                    <SongCard
                        key={index}
                        title={song.songName}
                        artist={song.fullName}
                        album={song.words}
                        cover={song.urlPicsumPhotos}
                        addedToPlaylist={true}
                        playlistCard={true}
                    />
                ))}
            </div>
        </section>
    );
}

export default Playlist;