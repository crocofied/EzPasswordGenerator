import { useState } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [displayPassword, setDisplayPassword] = useState('')

  const generatePassword = () => {
    axios.get('http://localhost:8000/password')
      .then(response => {
        setDisplayPassword(response.data.password)
      })
  }

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      EzPasswordGenerator
    </h1>
    <button onClick={generatePassword}>Generate a Password</button>
    <p>{displayPassword}</p>
    </>
      
  )
}

export default App
