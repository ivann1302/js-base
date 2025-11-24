import { useEffect, type RefObject } from 'react'

// Хук для закрытия компонента при клике вне него области

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Проверяем, что клик был вне всех указанных элементов
      const isClickOutside = refs.every(
        ref => ref.current && !ref.current.contains(target)
      )

      if (isClickOutside) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, callback])
}

export default useClickOutside
