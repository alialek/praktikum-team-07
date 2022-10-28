import React, { useEffect } from 'react'
import { HomePage } from '../../pages/HomePage'
import './App.scss'

export const App: React.FC = () => {
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
      <HomePage />
    </div>
  )
}
