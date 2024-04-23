'use client'
import { Button } from '@/components/Button/Button'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'

const ResetAll: React.FC = () => {
  const { setAlert } = useAlertActions()

  return (
    <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-semibold'>Reset all settings</h1>
          <p className='opacity-50 text-sm'>
            This will reset all your settings to their default values
          </p>
        </div>
        <div>
          <Button
            text='Reset'
            bgColor='bg-red-500'
            func={() => {
              document.cookie =
                'config=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

              setAlert({
                message:
                  'Your settings have been reset, refresh the page to see the changes',
                type: 'success'
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { ResetAll }
