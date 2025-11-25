import styles from './tasksPage.module.scss'
import type { TTaskStatusFilter } from '@/pages/tasks-page/model/types'

interface ITaskStatusFilterProps {
  value: TTaskStatusFilter
  onChange: (value: TTaskStatusFilter) => void
}

export const TaskStatusFilter = ({
  value,
  onChange,
}: ITaskStatusFilterProps) => {
  const options: { value: TTaskStatusFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'completed', label: 'Решены' },
    { value: 'not-completed', label: 'Не решены' },
  ]

  return (
    <div className={styles.statusFilter}>
      {options.map(option => (
        <button
          key={option.value}
          className={`${styles.filterButton} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
