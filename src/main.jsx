import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
=======
import AppContextProvider from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
        <App />

  </AppContextProvider>
  </BrowserRouter>,
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
)
