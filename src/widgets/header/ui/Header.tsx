import { Link } from 'react-router-dom'
import styles from './header.module.scss'
import searchIconUrl from '@/shared/assets/icons/searchIcon.svg?url'

const navItems = [
  { href: '', label: 'База знаний', index: 0 },
  { href: '', label: 'Список задач', index: 1 },
  { href: '', label: 'Полезные материалы', index: 2 },
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
            <Link to={`/${item.href}`} className={styles.navLink} key={item.index}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.searchContainer}>
          <input type='text' placeholder='Поиск' className={styles.searchInput} />
          <button className={styles.searchButton}>
            <img src={searchIconUrl} alt='Поиск' className={styles.icon} />
          </button>
        </div>
      </div>
    </header>
  )
}
