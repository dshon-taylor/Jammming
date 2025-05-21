import { useState } from 'react'
import Background from './assets/components/Background'
import Header from './assets/components/Header'
import Main from './assets/components/Main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Background />
      <Header />
      <Main />
    </>
  )
}

export default App
