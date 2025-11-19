import { type ITaskCardProps } from '@/entities/task/model/types'
import styles from './task.module.scss'
import { DIFFICULTY_LABELS } from '@/entities/task/model/constants'

export default function Task({ task, onToggle }: ITaskCardProps) {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <span className={styles.taskDifficulty}>
          {DIFFICULTY_LABELS[task.difficulty]}
        </span>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => onToggle?.(task.id)}
            className={styles.taskCheckbox}
          />
          <span
            className={`${styles.checkboxCustom} ${task.completed ? styles.checked : ''}`}
          ></span>
        </label>
      </div>
      <div className={styles.taskContent}>
        <span className={styles.taskNumber}>{task.number}</span>
        <p className={styles.taskText}>{task.text}</p>
      </div>
    </div>
  )
}
