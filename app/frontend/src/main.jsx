import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { useSpeech, SpeechProvider } from './hooks/useSpeech.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpeechProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SpeechProvider>
  </React.StrictMode>,
)
