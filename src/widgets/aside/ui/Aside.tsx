import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './aside.module.scss'
import { categories } from '@/pages/knowledge-base-page/model/data'

export function Aside() {
  const { categoryId, topicId } = useParams()
  const [expandedCategories, setExpandedCategories] = useState<
    Set<string>
  >(new Set())

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        {categories.map(category => {
          const isExpanded = expandedCategories.has(category.id)
          const isActiveCategory = categoryId === category.id

          return (
            <div key={category.id} className={styles.category}>
              <div className={styles.categoryHeader}>
                <button
                  className={styles.toggleButton}
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isExpanded}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className={`${styles.arrowIcon} ${isExpanded ? styles.expanded : ''}`}
                  >
                    <path d='M9 18l6-6-6-6' />
                  </svg>
                </button>
                <Link
                  to={`/knowledge-base/${category.id}`}
                  className={`${styles.categoryLink} ${isActiveCategory ? styles.active : ''}`}
                >
                  {category.name}
                </Link>
              </div>

              {isExpanded && (
                <ul className={styles.topicsList}>
                  {category.topics.map(topic => {
                    const isActiveTopic = topicId === topic.id
                    return (
                      <li key={topic.id} className={styles.topicItem}>
                        <Link
                          to={`/knowledge-base/${category.id}/${topic.id}`}
                          className={`${styles.topicLink} ${isActiveTopic ? styles.active : ''}`}
                        >
                          {topic.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
