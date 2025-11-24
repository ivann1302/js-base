import type { RefObject } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { ISearchResult } from '@/features/search/model/types'
import { isExternalUrl } from '@/features/search/lib/utils/isExternalUrl'

interface IUseSearchActionsProps {
  navigate: NavigateFunction
  setQuery: (query: string) => void
  setIsOpen: (isOpen: boolean) => void
  inputRef: RefObject<HTMLInputElement>
}

export const useSearchActions = ({
  navigate,
  setQuery,
  setIsOpen,
  inputRef,
}: IUseSearchActionsProps) => {
  const handleResultClick = (result: ISearchResult): void => {
    if (isExternalUrl(result.url)) {
      window.location.href = result.url
    } else {
      navigate(result.url)
    }

    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleShowAll = (query: string): void => {
    // Переход на страницу поиска с закодированным запросом
    navigate(`/search?q=${encodeURIComponent(query)}`)

    // Очистка состояния
    setQuery('')
    setIsOpen(false)

    // Убираем фокус с input
    inputRef.current?.blur()
  }

  return {
    handleResultClick,
    handleShowAll,
  }
}
