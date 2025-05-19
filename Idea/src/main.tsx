import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  const errorDiv = document.createElement('div')
  errorDiv.id = 'root'
  document.body.appendChild(errorDiv)
}

const root = createRoot(rootElement || document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 