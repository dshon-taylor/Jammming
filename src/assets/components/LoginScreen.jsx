import React from 'react';
import styles from './LoginScreen.module.css';
import { redirectToSpotifyLogin, getToken } from '../components/SpotifyAccess';
import Header from './Header';

// In your component:
function LoginScreen () {
    return (
        <div className={styles.loginScreen}>
            <Header />
            <button onClick={redirectToSpotifyLogin}>Log in with Spotify</button>
        </div>
    )
}

export default LoginScreen;
