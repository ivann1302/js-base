const TASKS_STORAGE_KEY = 'js-base-tasks-status'

export interface ITasksStatus {
  [taskId: string]: boolean
}

export const getTasksStatusFromStorage = (): ITasksStatus => {
  if (typeof window === 'undefined') return {}

  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Ошибка при чтении из localStorage:', error)
    return {}
  }
}

export const saveTasksStatusToStorage = (
  status: ITasksStatus
): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(status))
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error)
  }
}

export const updateTaskStatusInStorage = (
  taskId: string,
  completed: boolean
): void => {
  const currentStatus = getTasksStatusFromStorage()
  const updatedStatus = {
    ...currentStatus,
    [taskId]: completed,
  }
  saveTasksStatusToStorage(updatedStatus)
}
