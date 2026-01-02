import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

// If pre-rendered HTML exists, hydrate. Otherwise, render fresh.
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
