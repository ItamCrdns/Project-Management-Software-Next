'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Check } from './Check'
import { useEffect, useRef, useState } from 'react'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { Error as AlertError } from './Error'
import { BellAlert } from '@/svg/BellAlert'

// * Show: tracks if the alert should be shown
// * Message: the message to be displayed
// * Type: color, success = white, error = red

const Alert: React.FC = () => {
  const alert = useAppSelector((state) => state.alert)
  const { hideAlert } = useAlertActions()

  const [isHover, setIsHover] = useState<boolean>(false)

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  // Hide alter after 5 seconds
  useEffect(() => {
    if (isHover && timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    if (alert.show === true && !isHover) {
      timeoutIdRef.current = setTimeout(() => {
        hideAlert()
      }, 5000)
    }
  }, [alert, isHover])

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${
        alert.show === true
          ? 'animate-slide-in-from-bottom'
          : 'animate-slide-out-to-bottom'
      } text-sm fixed bottom-0 right-0 min-w-80 m-4 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md py-4 px-6 z-[999999]`}
    >
      <div className='flex gap-2 items-center'>
        {alert.type && alert.type === 'success' && <Check />}
        {alert.type && alert.type === 'error' && <AlertError />}
        {alert.type && alert.type === 'notification' && <BellAlert />}
        {alert.type && alert.type === 'loading' && (
          <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
        )}
        <p>{alert.message}</p>
      </div>
    </div>
  )
}

export default Alert
