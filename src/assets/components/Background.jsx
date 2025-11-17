import React, { useRef, useEffect } from 'react';
import styles from '../../styles/Background.module.css';
import bgVideo from '../bg-video.mp4';

function Background () {
    const videoRef = useRef(null);

    useEffect(() => {
        // Attempt to play the video programmatically. Modern Safari allows muted autoplay,
        // but calling play() helps in some cases where autoplay is blocked until play() is invoked.
        const v = videoRef.current;
        if (v) {
            const playPromise = v.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    // Autoplay was probably blocked. Keep video muted and without controls so
                    // the poster frame shows — the user can still start playback manually.
                    // console.debug('Background video play prevented:', err);
                });
            }
        }
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                className={styles.backgroundVideo}
                loop
                autoPlay
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.overlay}></div>
        </div>
    );
}

export default Background;