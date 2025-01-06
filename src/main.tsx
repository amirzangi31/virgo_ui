import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastProvider } from './components'

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>

            <App />
            <ToastProvider position='top-left' />
      </React.StrictMode>,
)
