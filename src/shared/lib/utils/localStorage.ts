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

const TASKS_FILTERS_KEY = 'js-base-tasks-filters'

import type { ITasksFilters } from '@/pages/tasks-page/model/types'
import { DEFAULT_FILTERS } from '@/pages/tasks-page/model/constants'

export const getTasksFiltersFromStorage = (): ITasksFilters => {
  if (typeof window === 'undefined') {
    return DEFAULT_FILTERS
  }

  try {
    const stored = localStorage.getItem(TASKS_FILTERS_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_FILTERS
  } catch (error) {
    console.error(
      'Ошибка при чтении фильтров из localStorage:',
      error
    )
    return DEFAULT_FILTERS
  }
}

export const saveTasksFiltersToStorage = (
  filters: ITasksFilters
): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(TASKS_FILTERS_KEY, JSON.stringify(filters))
  } catch (error) {
    console.error(
      'Ошибка при сохранении фильтров в localStorage:',
      error
    )
  }
}
