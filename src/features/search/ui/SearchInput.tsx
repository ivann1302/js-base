import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClickOutside } from '@/shared/lib/hooks'
import {
  useSearchInput,
  useKeyboardNavigation,
  useSearchActions,
} from '@/features/search/lib/hooks'
import { SearchDropdown } from './SearchDropdown'
import { icons } from '@/shared/assets/icons'
import styles from './searchInput.module.scss'

export const SearchInput = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    handleInputChange,
    handleInputFocus,
  } = useSearchInput()

  // Действия поиска (клик по результату и  показать все)
  const { handleResultClick, handleShowAll } = useSearchActions({
    navigate,
    setQuery,
    setIsOpen,
    inputRef,
  })

  // Навигация с клавиатуры
  const { handleKeyDown } = useKeyboardNavigation({
    isOpen,
    results,
    focusedIndex,
    query,
    inputRef,
    onSelect: index => handleResultClick(results[index]),
    onShowAll: () => handleShowAll(query),
    onClose: () => setIsOpen(false),
    setFocusedIndex,
  })

  // Закрытие при клике вне компонента
  useClickOutside([inputRef, dropdownRef], () => setIsOpen(false))

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
        className={`${styles.searchButton} ${query.trim() ? styles.active : ''}`}
        onClick={() => query.trim() && handleShowAll(query)}
        aria-label='Поиск'
      >
        <img src={icons.search} alt='Поиск' className={styles.icon} />
      </button>

      {isOpen && results.length > 0 && (
        <SearchDropdown
          results={results}
          query={query}
          focusedIndex={focusedIndex}
          dropdownRef={dropdownRef}
          onResultClick={handleResultClick}
          onShowAll={() => handleShowAll(query)}
          onMouseEnter={setFocusedIndex}
          onMouseEnterShowAll={() => setFocusedIndex(-1)}
        />
      )}
    </div>
  )
}
