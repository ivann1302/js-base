export type TTaskStatusFilter = 'all' | 'completed' | 'not-completed'
export type TTaskSortOrder = 'difficulty-asc' | 'difficulty-desc'

export interface ITasksFilters {
  status: TTaskStatusFilter
  sort: TTaskSortOrder
}
