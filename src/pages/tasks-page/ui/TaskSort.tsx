import styles from './tasksPage.module.scss'
import type { TTaskSortOrder } from '@/pages/tasks-page/model/types'

interface ITaskSortProps {
  value: TTaskSortOrder
  onChange: (value: TTaskSortOrder) => void
}

export const TaskSort = ({ value, onChange }: ITaskSortProps) => {
  const handleToggle = () => {
    onChange(
      value === 'difficulty-asc'
        ? 'difficulty-desc'
        : 'difficulty-asc'
    )
  }

  return (
    <div className={styles.sortFilter}>
      <span className={styles.sortLabel}>Сортировка:</span>
      <button
        className={`${styles.sortButton} ${styles.active}`}
        onClick={handleToggle}
      >
        По сложности {value === 'difficulty-asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}
