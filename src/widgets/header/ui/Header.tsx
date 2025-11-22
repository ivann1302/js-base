import { Link } from 'react-router-dom'
import { SearchInput } from '@/features/search'
import styles from './header.module.scss'

const navItems = [
  { href: 'knowledge-base', label: 'База знаний', index: 0 },
  { href: 'tasks', label: 'Список задач', index: 1 },
  { href: 'resources', label: 'Полезные материалы', index: 2 },
]

export function Header() {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        JS
        <br />
        Base
      </Link>
      <div className={styles.headerContent}>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              to={`/${item.href}`}
              className={styles.navLink}
              key={item.index}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <SearchInput />
      </div>
    </header>
  )
}
