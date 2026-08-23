import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.jsx'
import './index.css'

// Мета-теги для краулерів кладе в HTML scripts/prerender.js (соцмережі не
// виконують JS і без них показують посилання без картки). У браузері їх треба
// прибрати до монтування: react-helmet-async не замінює чужі теги, а додає
// свої поруч — інакше в head було б по два <title>, canonical і og:image.
document.head
  .querySelectorAll('[data-prerender]')
  .forEach((el) => el.remove())

// контейнер для React
const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)