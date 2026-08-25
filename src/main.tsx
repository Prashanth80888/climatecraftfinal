import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App'
import { Preloader } from './components/Preloader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Preloader>
          <App />
        </Preloader>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
