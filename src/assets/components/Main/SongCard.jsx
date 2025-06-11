import React, { useState, useRef, useEffect } from 'react';
import styles from './SongCard.module.css';
import playlistStyles from './Playlist.module.css';

function SongCard({ title, artist, album, cover, addedToPlaylist, playlistCard, onAdd, onRemove, removing, somethingRemoving }) {
    const titleRef = useRef(null);
    const artistRef = useRef(null);
    const containerRef = useRef(null);
    const [titleOverflowing, setTitleOverflowing] = useState(false);
    const [artistOverflowing, setArtistOverflowing] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const title = titleRef.current;
        const artistLine = artistRef.current;

        const checkOverflow = () => {
            const containerWidth = container.clientWidth;
            const titleWidth = title.scrollWidth;
            const artistLineWidth = artistLine.scrollWidth;

            if (containerWidth && titleWidth) {
                setTitleOverflowing(containerWidth < titleWidth);
            }
            if (containerWidth && artistLineWidth) {
                setArtistOverflowing(containerWidth < artistLineWidth);
            }
        }

        checkOverflow();

        const resizeObserver = new window.ResizeObserver(checkOverflow);
        resizeObserver.observe(container);

        window.addEventListener("resize", checkOverflow);

        return () => {
            window.removeEventListener("resize", checkOverflow);
        }

    }, [title, artist])

    const titleAnimationDistance = titleOverflowing ? titleRef.current.scrollWidth - containerRef.current.clientWidth + 10: 0;
    const artistAnimationDistance = artistOverflowing ? artistRef.current.scrollWidth - containerRef.current.clientWidth + 10: 0;
    let titleAnimationDuration = titleAnimationDistance * 40;
    let artistAnimationDuration = artistAnimationDistance * 40;

    if (titleAnimationDuration < 3000) {
        titleAnimationDuration = 3000;
    }

    if (artistAnimationDuration < 3000) {
        artistAnimationDuration = 3000;
    }

    let longerAnimationDuration = (titleAnimationDuration > artistAnimationDuration) ? titleAnimationDuration : artistAnimationDuration;



    console.log(titleAnimationDistance)
    console.log(artistAnimationDistance)

    const buttonClass = playlistCard ? `remove-from-playlist ${removing ? ' remove-animation' : ''}` : 'add-to-playlist';

    const handleClick = () => {
        if (somethingRemoving) return; // Disable all removal if any card is removing

        if (!playlistCard && !addedToPlaylist) {
            onAdd();
        } else if (!playlistCard && addedToPlaylist) {
            onRemove();
        } else if (playlistCard && addedToPlaylist) {
            onRemove();
        }
    };

    const cardClassName = [
        styles.songCard,
        playlistCard ? playlistStyles.playlistCard : '',
        !playlistCard && addedToPlaylist ? 'selected' : '',
        playlistCard && removing ? 'remove-entry-animation' : ''
    ].join(' ');

    return (
        <div className={cardClassName}>
            <img src={cover} title={`Album art for ${album} by ${artist[0].name}`} />
            <div className={styles.songInfo} ref={containerRef}>
                <h3
                ref={titleRef}
                className={titleOverflowing ? styles.animate : ''}
                style={{
                    animationDuration: `${longerAnimationDuration}ms`,
                    '--animation-distance': `-${titleAnimationDistance}px`
                }}
                >
                    {title}
                </h3>
                <p
                ref={artistRef}
                className={artistOverflowing ? styles.animate : ''}
                style={{
                    animationDuration: `${longerAnimationDuration}ms`,
                    '--animation-distance': `-${artistAnimationDistance}px`
                }}
                >
                    {artist.map(a => a.name).join(', ')} { !playlistCard ? <span className={styles.albumTitle}>| {album}</span>: ''}
                </p>
            </div>
            <span
                className={buttonClass}
                onClick={handleClick}
                style={removing ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
        </div>
    );
}

export default SongCard;