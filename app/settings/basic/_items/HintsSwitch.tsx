'use client'
import { type IConfig } from '@/interfaces/config'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { Switch } from '@tremor/react'

const HintsSwitch: React.FC<{ config?: string }> = (props) => {
  const config: IConfig = JSON.parse(props.config ?? '{}')

  const hintsEnabled = config.hideAllHints === undefined || !config.hideAllHints

  const { setAlert } = useAlertActions()

  return (
    <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-semibold'>Show hints</h1>
          <p className='opacity-50 text-sm'>
            Hints can help make using the app more straightforward
          </p>
        </div>
        <Switch
          defaultChecked={hintsEnabled}
          onChange={(value) => {
            // If truthy, set all hides to false, if falsy, set all hides to true
            const newConfig: IConfig = {
              ...config,
              hideAllHints: !value,
              hideProjectsHint: !value,
              hideTasksHint: !value
            }

            const cookieExpirationDate = new Date()
            cookieExpirationDate.setDate(
              cookieExpirationDate.getFullYear() + 10
            )

            document.cookie = `config=${JSON.stringify(
              newConfig
            )}; expires=${cookieExpirationDate.toUTCString()}; path=/`

            setAlert({
              message: 'Your configuration has been updated',
              type: 'success'
            })
          }}
        />
      </div>
    </div>
  )
}

export { HintsSwitch }
