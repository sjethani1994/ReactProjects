import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// const anotherReactElement = (
//   <a href="https://www.google.com" target="_blank">
//     Click me to go to Google
//   </a>
// )

// const anotherUserName = "Mary Jane";

// const ReactElement = React.createElement(
//   'a',
//   { href: 'https://www.google.com', target: '_blank' },
//   'Click me to go to Google',
//   anotherUserName
// )
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
