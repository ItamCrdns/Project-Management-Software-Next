'use client'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Check } from './Check'
import React, { useEffect, useRef, useState } from 'react'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { Error as AlertError } from './Error'
import { BellAlert } from '@/svg/BellAlert'
import { Close } from '@/svg/Close'
import { AnimatePresence, motion } from 'framer-motion'

const Alert: React.FC = () => {
  const alerts = useAppSelector((state) => state.alert)
  const { hideAlert } = useAlertActions()

  const [isHover, setIsHover] = useState<boolean>(false)

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  // Hide alter after 5 seconds
  useEffect(() => {
    if (isHover && timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    // Start a timeout to hide each alter after 5s
    alerts.forEach((alert) => {
      if (!isHover) {
        timeoutIdRef.current = setTimeout(() => {
          hideAlert(alert.id)
        }, 5000)
      }
    })

    if (alerts.length > 5) {
      hideAlert(alerts[0].id)
    }
  }, [alerts, isHover])

  return (
    <div
      className='fixed bottom-0 right-0'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className='-space-y-4 flex flex-col items-end'>
        <AnimatePresence>
          {alerts.map((alert) => (
            <React.Fragment key={alert.id}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <div
                  key={alert.id}
                  className={`border-l-4 ${
                    (alert.type === 'success' && 'border-green-500') ||
                    (alert.type === 'error' && 'border-red-500') ||
                    (alert.type === 'notification' &&
                      'border-azure-radiance-500') ||
                    (alert.type === 'loading' && 'border-blue-400')
                  } text-sm min-w-[300px] m-4 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md py-4 px-6 z-[999] relative`}
                >
                  <div
                    className='absolute -top-1 -right-1 bg-white dark:bg-theming-dark300 rounded-full shadow-md cursor-pointer p-[2px]'
                    onClick={() => {
                      console.log(alert.id)
                      hideAlert(alert.id)
                    }}
                  >
                    <Close size={3} />
                  </div>
                  <div className='flex gap-2 items-center'>
                    {alert.type && alert.type === 'success' && <Check />}
                    {alert.type && alert.type === 'error' && <AlertError />}
                    {alert.type && alert.type === 'notification' && (
                      <BellAlert />
                    )}
                    {alert.type && alert.type === 'loading' && (
                      <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 w-4 h-4'></div>
                    )}
                    <p>{alert.message}</p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Alert
