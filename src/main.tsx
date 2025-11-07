import { createRoot } from 'react-dom/client'
import './index.scss'
import { getDeviceType } from '@/shared/assets/lib/utils/device'
import AppDesktop from './App.desktop'
import AppMobile from './App.mobile'

const deviceType = getDeviceType()
const App = deviceType === 'mobile' ? AppMobile : AppDesktop

const rootElement = document.getElementById('root')!
if (rootElement) {
  createRoot(rootElement).render(<App />)
}
