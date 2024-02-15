import { useEffect } from 'react'

interface ClickOutsideCloseProps {
  ref: React.RefObject<HTMLElement | null>
  closeThis: () => void
}
const closeOnOutsideClick = (props: ClickOutsideCloseProps): void => {
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

export default closeOnOutsideClick
