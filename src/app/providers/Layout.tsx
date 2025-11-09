import type { ReactNode } from 'react'
import { Footer } from '@/widgets/footer'
import styles from './layout.module.scss'

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
