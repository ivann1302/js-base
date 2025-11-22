import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { searchLimited } from '../model'
import {
  extractMatchFragment,
  highlightMatch,
} from '@/shared/lib/utils/searchUtils'
import { icons } from '@/shared/assets/icons'
import styles from './searchInput.module.scss'
import type { ISearchResult } from '../model/types'

const DROPDOWN_LIMIT = 5
const DEBOUNCE_DELAY = 300

export const SearchInput = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ISearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Поиск при изменении запроса
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const searchResults = searchLimited(
        debouncedQuery,
        DROPDOWN_LIMIT
      )
      setResults(searchResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(e.target.value)
    setFocusedIndex(-1)
  }

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true)
    }
  }

  const handleResultClick = (result: ISearchResult) => {
    navigate(result.url)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleShowAll = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          handleResultClick(results[focusedIndex])
        } else if (query.trim()) {
          handleShowAll()
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const getResultTypeLabel = (
    type: ISearchResult['type']
  ): string => {
    switch (type) {
      case 'knowledge':
        return 'База знаний'
      case 'task':
        return 'Задача'
      case 'resource':
        return 'Ресурс'
      default:
        return ''
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Поиск'
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        className={styles.searchInput}
      />
      <button
        className={styles.searchButton}
        onClick={() => query.trim() && handleShowAll()}
        aria-label='Поиск'
      >
        <img src={icons.search} alt='Поиск' className={styles.icon} />
      </button>

      {isOpen && results.length > 0 && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <ul className={styles.resultsList}>
            {results.map((result, index) => (
              <li
                key={result.id}
                className={`${styles.resultItem} ${
                  index === focusedIndex ? styles.focused : ''
                }`}
                onClick={() => handleResultClick(result)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultType}>
                    {getResultTypeLabel(result.type)}
                  </span>
                  {result.categoryName && (
                    <span className={styles.resultCategory}>
                      {result.categoryName}
                    </span>
                  )}
                </div>
                <div
                  className={styles.resultTitle}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(result.title, query),
                  }}
                />
                {result.description && (
                  <div className={styles.resultDescription}>
                    {extractMatchFragment(
                      result.description,
                      query,
                      80
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button
            className={styles.showAllButton}
            onClick={handleShowAll}
            onMouseEnter={() => setFocusedIndex(-1)}
          >
            Показать все результаты
          </button>
        </div>
      )}
    </div>
  )
}
