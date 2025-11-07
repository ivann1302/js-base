import { createRoot } from 'react-dom/client'
import './index.scss'
import AppDesktop from './App.desktop.tsx'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<AppDesktop />)
}
