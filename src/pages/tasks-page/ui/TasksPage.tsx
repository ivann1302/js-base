import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './tasksPage.module.scss'
import { Task } from '@/entities/task'
import { tasks as initialTasks } from '@/pages/tasks-page/model/data'
import { type ITask } from '@/entities/task/model/types'
import { icons } from '@/shared/assets/icons'
import Icon from '@/shared/ui/icon/ui/Icon'

const TASKS_PER_PAGE = 10

export default function TasksPage() {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page')) || 1
    return page < 1 ? 1 : page
  }, [searchParams])

  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE)
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE
  const paginatedTasks = tasks.slice(
    startIndex,
    startIndex + TASKS_PER_PAGE
  )

  const handleToggle = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() })
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
