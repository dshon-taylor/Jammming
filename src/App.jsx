import { useState } from 'react'
import Background from './assets/components/Background'
import Header from './assets/components/Header'
import Main from './assets/components/Main/Main'
import mockData from './assets/mockData.json';

function App() {
  const [playlist, setPlaylist] = useState([]);

  return (
    <>
      <Background />
      <Header />
      <Main playlist={playlist} setPlaylist={setPlaylist} songs={mockData} />
    </>
  )
}

export default App
