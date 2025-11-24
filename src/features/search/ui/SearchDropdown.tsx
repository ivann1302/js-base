import { type RefObject } from 'react'
import type { ISearchResult } from '@/features/search/model/types'
import { SearchResultItem } from './SearchResultItem'
import styles from './searchInput.module.scss'

interface ISearchDropdownProps {
  results: ISearchResult[]
  query: string
  focusedIndex: number
  dropdownRef: RefObject<HTMLDivElement>
  onResultClick: (result: ISearchResult) => void
  onShowAll: () => void
  onMouseEnter: (index: number) => void
  onMouseEnterShowAll: () => void
}

export const SearchDropdown = ({
  results,
  query,
  focusedIndex,
  dropdownRef,
  onResultClick,
  onShowAll,
  onMouseEnter,
  onMouseEnterShowAll,
}: ISearchDropdownProps) => {
  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <ul className={styles.resultsList}>
        {results.map((result, index) => (
          <SearchResultItem
            key={result.id}
            result={result}
            query={query}
            isFocused={index === focusedIndex}
            onClick={() => onResultClick(result)}
            onMouseEnter={() => onMouseEnter(index)}
          />
        ))}
      </ul>
      <button
        className={styles.showAllButton}
        onClick={onShowAll}
        onMouseEnter={onMouseEnterShowAll}
      >
        Показать все результаты
      </button>
    </div>
  )
}
