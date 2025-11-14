import styles from './tasksPage.module.scss'
import { Task } from '@/entities/task'
import { tasks } from '@/pages/tasks-page/model/data'

export default function TasksPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>База задач</h1>
      <ul className={styles.tasksList}>
        {tasks.map(task => {
          return (
            <li key={task.id} className={styles.taskItem}>
              <Task task={task} onToggle={() => {}} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
