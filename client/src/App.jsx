import { useState } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  // Basic state variables for the password generator
  const [displayPassword, setDisplayPassword] = useState('Click the button to generate a password')
  const [passwordLength, setPasswordLength] = useState(20)
  const [darkMode, setDarkMode] = useState(true)
  
  // Advanced settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [letters, setLetters] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const base_url = 'http://' // Change to your server's URL

  // Function to generate a password with the given settings over the API
  const generatePassword = () => {
    axios.get( base_url + 'password/?length='+ passwordLength + '&letters=' + letters + '&digits=' + numbers + '&special=' + symbols)
      .then(response => {
        setDisplayPassword(response.data.password)
      })
  }

  // Function to switch between dark and light mode
  const switchDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.getElementById("darkmode").classList.remove('dark')
    } else {
      document.getElementById("darkmode").classList.add('dark')
    }
  }

  return (
    <div id="darkmode" className="dark">
      <div className='flex flex-col items-center bg-white dark:bg-black h-screen'>
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 dark:text-gray-300 p-4">
          EzPasswordGenerator
        </h1>
        
        <label class="inline-flex items-center cursor-pointer pb-3">
          <div className="flex">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300 pr-2">Dark Mode</span>
            <input type="checkbox" value="" class="sr-only peer" onChange={switchDarkMode}/>
            <div class="relative w-11 h-6  peer-focus:outline-none peer-focus:ring-4 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Light Mode</span>
          </div>
        </label>

        {/* Input Values and Button */}
        <div className="pt-5 border lg:w-1/3 w-3/4 border-slate-700 dark:border-gray-300 flex flex-col items-center">
          <label
            for="length"
            class="mb-2 inline-block text-slategrey-700 dark:text-gray-300 "
            >Password Length</label
          >
          <input
            type="range"
            className="transparent h-[4px] w-3/4 lg:w-1/2 mx-auto cursor-pointer appearance-none border-transparent dark:bg-neutral-400 bg-neutral-700"
            min="6"
            max="20"
            id="length" 
            onChange={(e) => setPasswordLength(e.target.value)}/> 
            <p className='text-slategrey-700 dark:text-gray-300'>{passwordLength}</p>
            <div className="pb-2">
              <button className="font-bold rounded bg-transparent border border-slate-700 dark:border-gray-300 hover:bg-slate-700 dark:hover:text-gray-300 text-slate-700 dark:text-gray-300 hover:text-white py-2 px-2" onClick={generatePassword}>Generate a Password</button>
            </div>
            <label htmlFor="showAdvanced" className="flex">
              <input
                type="checkbox"
                id="showAdvanced"
                className="mr-2"
                checked={showAdvanced}
                onChange={() => {
                  setShowAdvanced(!showAdvanced)
                  if (showAdvanced) {
                    console.log(".")
                    setLetters(true)
                    setNumbers(true)
                    setSymbols(true)
                  }
                }}
              />
              <p className="text-slate-700 dark:text-white font-bold">Show Advanced Settings</p>
            </label>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className='pb-3'>
          <div className="advanced-settings flex-col items-center cursor-pointer pb-3 border border-slate-700 dark:border-gray-300 p-2">
            <label htmlFor="disableStrings" className="flex">
              <input
                type="checkbox"
                id="disableStrings"
                className="mr-2"
                defaultChecked={true}
                disabled={!numbers && !symbols}
                onChange={() => setLetters(!letters)}
              />
              <p className="text-slate-700 dark:text-white">Contain Letters</p>
            </label>
            <label htmlFor="disableNumbers" className="flex">
              <input
                type="checkbox"
                id="disableNumbers"
                className="mr-2"
                defaultChecked={true}
                disabled={!letters && !symbols}
                onChange={() => setNumbers(!numbers)}
              />
              <p className="text-slate-700 dark:text-white">Contain Numbers</p>
            </label>
            <label htmlFor="disableSymbols" className="flex">
              <input
                type="checkbox"
                id="disableSymbols"
                className="mr-2"
                defaultChecked={true}
                disabled={!letters && !numbers}
                onChange={() => setSymbols(!symbols)}
              />
              <p className="text-slate-700 dark:text-white">Contain Special Characters</p>
            </label>
          </div>
        </div>
      )}
        </div>
        {/* Generated Password Display */}
        <div className='pt-5 lg:w-1/3 w-3/4'>
        <div className='border border-slate-700 dark:border-gray-300 p-2 flex justify-center items-center'>
          <div className='flex space-x-1 items-center'>
            <p className='text-slategrey-700 dark:text-gray-300'>{displayPassword}</p>
            <button className="font-bold rounded bg-transparent border border-slate-700 dark:border-gray-300 hover:bg-slate-700 text-slate-700 dark:text-gray-300 hover:text-white py-2 px-2" onClick={() => navigator.clipboard.writeText(displayPassword)}>
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
    </div>    
  )
}

export default App
