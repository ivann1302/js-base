import { createRoot } from 'react-dom/client'
import './index.scss'
import AppMobile from './App.mobile'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

root.render(<AppMobile />)
