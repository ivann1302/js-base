import { Outlet } from 'react-router-dom'
import { useIsMobile } from '@/shared/lib/hooks/useDeviceType'
import { Layout } from '@/app/providers/Layout'
import styles from './App.module.scss'

export function App() {
  const isMobile = useIsMobile()
  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}
