import { useState, useEffect } from 'react'
import { useDebounce } from '@/shared/lib/hooks'
import { searchLimited } from '@/features/search/model'
import type { ISearchResult } from '@/features/search/model/types'
import {
  DEBOUNCE_DELAY,
  DROPDOWN_LIMIT,
} from '@/features/search/model/constants'

// Хук для управления состоянием и логикой поиска

export const useSearchInput = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ISearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY)

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

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    handleInputChange,
    handleInputFocus,
  }
}
