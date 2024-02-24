import { useState } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [displayPassword, setDisplayPassword] = useState('Click the button to generate a password')

  const generatePassword = () => {
    axios.get('http://localhost:8000/password')
      .then(response => {
        setDisplayPassword(response.data.password)
      })
  }

  return (
    <>
    <div className='flex flex-col items-center'>
      <h1 className="text-3xl font-bold text-slate-800 p-4">
        EzPasswordGenerator
      </h1>
      <button className="font-bold rounded bg-transparent border border-slate-700 hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-2" onClick={generatePassword}>Generate a Password</button>
      <div className='pt-5'>
        <p className='border border-slate-700 p-2'>{displayPassword}</p>
      </div>
    </div>
    </>
      
  )
}

export default App
