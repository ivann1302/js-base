import { Outlet } from 'react-router-dom'
import { getDeviceType } from '@/shared/assets/lib/utils/device'
import { Layout } from '@/app/providers/Layout'
import styles from './App.module.scss'

export function App() {
  const deviceType = getDeviceType()
  const isMobile = deviceType === 'mobile'
  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}
