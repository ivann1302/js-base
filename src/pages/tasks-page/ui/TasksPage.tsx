import { useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './tasksPage.module.scss'
import { Task } from '@/entities/task'
import { icons } from '@/shared/assets/icons'
import Icon from '@/shared/ui/icon/ui/Icon'
import {
  TASKS_PER_PAGE,
  DEFAULT_FILTERS,
} from '@/pages/tasks-page/model/constants'
import { useTasksWithPersistence } from '@/pages/tasks-page/lib/hooks/useTasksWithPersistence'
import { useTasksFilter } from '@/pages/tasks-page/lib/hooks/useTasksFilter'
import { TaskStatusFilter } from './TaskStatusFilter'
import { TaskSort } from './TaskSort'
import type {
  TTaskStatusFilter,
  TTaskSortOrder,
} from '@/pages/tasks-page/model/types'
import {
  getTasksFiltersFromStorage,
  saveTasksFiltersToStorage,
} from '@/shared/lib/utils/localStorage'

export default function TasksPage() {
  const { tasks, handleToggle } = useTasksWithPersistence()
  const [searchParams, setSearchParams] = useSearchParams()

  const statusFilter =
    (searchParams.get('status') as TTaskStatusFilter) ||
    DEFAULT_FILTERS.status
  const sortOrder =
    (searchParams.get('sort') as TTaskSortOrder) ||
    DEFAULT_FILTERS.sort

  useEffect(() => {
    const savedFilters = getTasksFiltersFromStorage()
    if (
      savedFilters.status !== statusFilter ||
      savedFilters.sort !== sortOrder
    ) {
      saveTasksFiltersToStorage({
        status: statusFilter,
        sort: sortOrder,
      })
    }
  }, [statusFilter, sortOrder])

  const filters = useMemo(
    () => ({ status: statusFilter, sort: sortOrder }),
    [statusFilter, sortOrder]
  )

  const filteredAndSortedTasks = useTasksFilter(tasks, filters)

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page')) || 1
    return page < 1 ? 1 : page
  }, [searchParams])

  const totalPages = Math.ceil(
    filteredAndSortedTasks.length / TASKS_PER_PAGE
  )
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE
  const paginatedTasks = filteredAndSortedTasks.slice(
    startIndex,
    startIndex + TASKS_PER_PAGE
  )

  const handleStatusChange = (status: TTaskStatusFilter) => {
    setSearchParams({ status, sort: sortOrder, page: '1' })
  }

  const handleSortChange = (sort: TTaskSortOrder) => {
    setSearchParams({ status: statusFilter, sort, page: '1' })
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev)
        newParams.set('page', page.toString())
        return newParams
      })
    }
  }

  const getVisiblePages = () => {
    const pages: number[] = []
    if (currentPage > 1) {
      pages.push(currentPage - 1)
    }
    pages.push(currentPage)
    if (currentPage < totalPages) {
      pages.push(currentPage + 1)
    }
    return pages
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>База задач</h1>

      <div className={styles.filtersContainer}>
        <TaskStatusFilter
          value={statusFilter}
          onChange={handleStatusChange}
        />
        <TaskSort value={sortOrder} onChange={handleSortChange} />
      </div>

      <ul className={styles.tasksList}>
        {paginatedTasks.map(task => {
          return (
            <li key={task.id} className={styles.taskItem}>
              <Task task={task} onToggle={handleToggle} />
            </li>
          )
        })}
      </ul>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon
              width={32}
              height={32}
              path={icons.arrowLeft}
              alt=''
            />
          </button>

          <div className={styles.pagesContainer}>
            {getVisiblePages().map(page => (
              <button
                key={page}
                className={`${styles.pageNumber} ${page === currentPage ? styles.current : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <div className={styles.mobilePageNumber}>{currentPage}</div>

          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon
              width={32}
              height={32}
              path={icons.arrowRight}
              alt=''
            />
          </button>
        </div>
      )}
    </div>
  )
}
