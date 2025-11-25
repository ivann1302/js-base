import { type ITaskCardProps } from '@/entities/task/model/types'
import styles from './task.module.scss'
import { DIFFICULTY_LABELS } from '@/entities/task/model/constants'

export default function Task({ task, onToggle }: ITaskCardProps) {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <span className={styles.taskDifficulty}>
          Сложность: {DIFFICULTY_LABELS[task.difficulty]}
        </span>
        <span
          className={`${styles.taskStatus} ${task.completed ? styles.completed : styles.notCompleted}`}
        >
          {task.completed ? 'Решена' : 'Не решена'}
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
        <p className={styles.taskText}>{task.text}</p>
      </div>
    </div>
  )
}
