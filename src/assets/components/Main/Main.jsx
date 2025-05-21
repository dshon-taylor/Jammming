import React from 'react';
import TrackSelector from './TrackSelector';

function Main() {
    return (
        <main>
            <div className="wrapper">
                <TrackSelector />
                <section id="playlist-container">
                <h2>Your Pla<span classNameName="clr-accent">yyy</span>list</h2>
                <div id="playlist">
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                    <div className="song-card">
                    <img src="./src/assets/album-cover.jpg" alt="Album Art" />
                    <div className="song-info">
                        <h3>Song Title</h3>
                        <p>Artist Name</p>
                    </div>
                    <span className="remove-from-playlist"></span>
                    </div>
                </div>
                <button id="save-playlist">Addd to Spotify</button>
                </section>
            </div>
        </main>
    )
}

export default Main;

    