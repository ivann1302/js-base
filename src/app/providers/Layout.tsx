import type { ReactNode } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/headers'
import styles from './layout.module.scss'

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
