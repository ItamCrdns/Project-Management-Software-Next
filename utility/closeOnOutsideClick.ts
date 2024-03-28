import { useEffect } from 'react'

export const useOutsideClick = (props: {
  ref: React.RefObject<HTMLElement | null>
  closeThis: () => void
}): void => {
  const { ref, closeThis } = props

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        closeThis()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])
}
