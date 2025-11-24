import { type RefObject } from 'react'
import type { ISearchResult } from '@/features/search/model/types'

// Хук для навигации по результатам поиска с клавиатуры

interface IUseKeyboardNavigationProps {
  isOpen: boolean
  results: ISearchResult[]
  focusedIndex: number // индекс выбранного элемента
  query: string
  inputRef: RefObject<HTMLInputElement> // ref на input элемент
  onSelect: (index: number) => void // callback при выборе результата по индексу/
  onShowAll: () => void // callback для показа всех результатов
  onClose: () => void
  setFocusedIndex: (
    index: number | ((prev: number) => number)
  ) => void
}

export const useKeyboardNavigation = ({
  isOpen,
  results,
  focusedIndex,
  query,
  inputRef,
  onSelect,
  onShowAll,
  onClose,
  setFocusedIndex,
}: IUseKeyboardNavigationProps) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    // Если список закрыт или нет результатов - игнорируем навигацию
    if (!isOpen || results.length === 0) {
      return
    }

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        // Переход к следующему результату
        // Не выходим за границы массива
        setFocusedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      }

      case 'ArrowUp': {
        e.preventDefault()
        // Переход к предыдущему результату
        // Можем вернуться к -1 (ничего не выбрано)
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      }

      case 'Enter': {
        e.preventDefault()
        // Если есть выбранный элемент - выбираем его
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          onSelect(focusedIndex)
        } else if (query.trim()) {
          // Иначе, если есть запрос - показываем все результаты
          onShowAll()
        }
        break
      }

      case 'Escape': {
        e.preventDefault()
        // Закрываем список и убираем фокус
        onClose()
        inputRef.current?.blur()
        break
      }

      // Остальные клавиши игнорируем
      default:
        break
    }
  }

  return {
    handleKeyDown,
  }
}
