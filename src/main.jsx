import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('🚀 main.jsx loaded!');

// Remove debug banner once React renders
const debugBanner = document.getElementById('debug-check');
if (debugBanner) {
  debugBanner.remove();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)