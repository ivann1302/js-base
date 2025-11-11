import { createRoot } from 'react-dom/client'
import { router } from './app/router'
import './index.scss'
import { RouterProvider } from 'react-router-dom'

const rootElement = document.getElementById('root')!
if (rootElement) {
  createRoot(rootElement).render(<RouterProvider router={router} />)
}
