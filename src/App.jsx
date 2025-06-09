import { useState, useEffect } from 'react'
import Background from './assets/components/Background'
import Header from './assets/components/Header'
import Main from './assets/components/Main/Main'
import LoginScreen from './assets/components/LoginScreen'
import { getToken } from './assets/components/SpotifyAccess'

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [active, setActive] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    // Check for Spotify code in URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      getToken(code).then(() => {
        setActive(true); // Show main app
        window.history.replaceState({}, document.title, '/'); // Clean up URL
      });
    } else if (localStorage.getItem('access_token')) {
      setNeedsLogin(false);
      setActive(true); // Already logged in
    }
  }, []);

  const postLoginClass = [
    "postLogin",
    active ? "active" : ""
  ].join(' ');

  useEffect(() => {
    if (needsLogin) {
      setActive(false);
    }
  }, [needsLogin]);

  return (
    <>
      {!active && <LoginScreen />}
      <Background />
      {active && (<div className={postLoginClass}>
        <Header />
        <Main playlist={playlist} setPlaylist={setPlaylist} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin} />
      </div>)}
    </>
  )
}

export default App
