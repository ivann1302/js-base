import { useState } from 'react'
import styles from './tasksPage.module.scss'
import { Task } from '@/entities/task'
import { tasks as initialTasks } from '@/pages/tasks-page/model/data'
import { type ITask } from '@/entities/task/model/types'

export default function TasksPage() {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)

  const handleToggle = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>База задач</h1>
      <ul className={styles.tasksList}>
        {tasks.map(task => {
          return (
            <li key={task.id} className={styles.taskItem}>
              <Task task={task} onToggle={handleToggle} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
