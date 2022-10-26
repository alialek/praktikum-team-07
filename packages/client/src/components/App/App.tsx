import { useEffect } from 'react'
import Home from '../../pages/HomePage'
import './App.scss'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div>
      <Home />
    </div>
  )
}

export default App
