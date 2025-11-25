import { useMemo } from 'react'
import type { ITask } from '@/entities/task/model/types'
import type { ITasksFilters } from '@/pages/tasks-page/model/types'
import { DIFFICULTY_ORDER } from '@/entities/task/model/constants'

export const useTasksFilter = (
  tasks: ITask[],
  filters: ITasksFilters
): ITask[] => {
  return useMemo(() => {
    let filtered: ITask[] = tasks

    if (filters.status === 'completed') {
      filtered = tasks.filter(task => task.completed)
    } else if (filters.status === 'not-completed') {
      filtered = tasks.filter(task => !task.completed)
    }

    const sorted = [...filtered].sort((a, b) => {
      const aOrder = DIFFICULTY_ORDER[a.difficulty]
      const bOrder = DIFFICULTY_ORDER[b.difficulty]

      if (filters.sort === 'difficulty-asc') {
        return aOrder - bOrder
      } else {
        return bOrder - aOrder
      }
    })

    return sorted
  }, [tasks, filters.status, filters.sort])
}
