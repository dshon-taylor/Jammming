import React from 'react';
import styles from '../../styles/Background.module.css';
import bgVideo from '../bg-video.mp4';

function Background () {
    return (
        <div>
            <video className={styles.backgroundVideo} loop autoPlay muted>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.overlay}></div>
        </div>
    );
}

export default Background;