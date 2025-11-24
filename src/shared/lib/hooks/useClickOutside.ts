import { useEffect, type RefObject } from 'react'

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void
) => {
  useEffect(() => {
    if (refs.length === 0) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

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
