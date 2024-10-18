import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CommentContext from './Context/CommentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    	<CommentContext>
    <App />
    </CommentContext>
  </StrictMode>,
)
