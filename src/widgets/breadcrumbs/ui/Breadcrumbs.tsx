import { Link } from 'react-router-dom'
import styles from './breadcrumbs.module.scss'

interface IBreadcrumb {
  label: string
  path: string
  isLast?: boolean
}

interface IBreadcrumbsProps {
  items: IBreadcrumb[]
}

export const Breadcrumbs = ({ items }: IBreadcrumbsProps) => {
  if (items.length === 0) return null

  return (
    <nav className={styles.breadcrumbs} aria-label='Хлебные крошки'>
      {items.map((crumb, index) => (
        <span
          key={`${crumb.path}-${crumb.label}`}
          className={styles.breadcrumbItem}
        >
          {crumb.isLast ? (
            <span className={styles.breadcrumbCurrent}>
              {crumb.label}
            </span>
          ) : (
            <>
              <Link to={crumb.path} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
              {index < items.length - 1 && (
                <span className={styles.breadcrumbSeparator}>/</span>
              )}
            </>
          )}
        </span>
      ))}
    </nav>
  )
}
