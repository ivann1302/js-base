import type { ITasksFilters } from './types'

export const TASKS_PER_PAGE = 10

export const DEFAULT_FILTERS: ITasksFilters = {
  status: 'all',
  sort: 'difficulty-asc',
}
