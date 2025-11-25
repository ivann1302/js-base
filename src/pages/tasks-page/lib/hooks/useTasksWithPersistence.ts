import { useState, useEffect } from 'react'
import { tasks as initialTasks } from '@/entities/task/model'
import type { ITask } from '@/entities/task/model/types'
import {
  getTasksStatusFromStorage,
  updateTaskStatusInStorage,
} from '@/shared/lib/utils/localStorage'

export const useTasksWithPersistence = () => {
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    const savedStatus = getTasksStatusFromStorage()

    const tasksWithSavedStatus = initialTasks.map(task => ({
      ...task,
      completed: savedStatus[task.id] ?? task.completed,
    }))

    setTasks(tasksWithSavedStatus)
  }, [])

  const handleToggle = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === id) {
          const newCompleted = !task.completed
          updateTaskStatusInStorage(id, newCompleted)
          return { ...task, completed: newCompleted }
        }
        return task
      })
      return updatedTasks
    })
  }

  return {
    tasks,
    handleToggle,
  }
}
