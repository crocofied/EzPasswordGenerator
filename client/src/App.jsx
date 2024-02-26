import { useState } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [displayPassword, setDisplayPassword] = useState('Click the button to generate a password')
  const [passwordLength, setPasswordLength] = useState(15)
  const base_url = 'http://localhost:8000' // Change to your server's URL

  const generatePassword = () => {
    axios.get( base_url + 'password/?length='+ passwordLength)
      .then(response => {
        setDisplayPassword(response.data.password)
      })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayPassword)
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Title */}
      <h1 className="text-3xl font-bold text-slate-800 p-4">
        EzPasswordGenerator
      </h1>

      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer"/>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
      </label>

      {/* Input Values and Button */}
      <div className="pt-5 border w-1/3 border-slate-700 flex flex-col items-center">
        <label
          for="length"
          class="mb-2 inline-block text-slategrey-700"
          >Password Length</label
        >
        <input
          type="range"
          className="transparent h-[4px] w-1/2 mx-auto cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
          min="6"
          max="15"
          id="length" 
          onChange={(e) => setPasswordLength(e.target.value)}/> {passwordLength}
          <div className="pb-2">
            <button className="font-bold rounded bg-transparent border border-slate-700 hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-2" onClick={generatePassword}>Generate a Password</button>
          </div>
      </div>
      {/* Generated Password Display */}
      <div className='pt-5 w-1/3'>
      <div className='border border-slate-700 p-2 flex justify-center items-center'>
        <div className='flex space-x-1 items-center'>
          <p className=''>{displayPassword}</p>
          <button className="font-bold rounded bg-transparent border border-slate-700 hover:bg-slate-700 text-slate-700 hover:text-white py-2 px-2" onClick={copyToClipboard}>
            <span id="default-icon">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App
