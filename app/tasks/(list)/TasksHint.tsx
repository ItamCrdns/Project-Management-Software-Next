'use client'
import Hint from '@/components/UI/Hint/Hint'
import { useHints } from '@/components/UI/Hint/useHints'
import { type IConfig } from '@/interfaces/config'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { useId } from 'react'

const TasksHint: React.FC<{ config?: string }> = (props) => {
  const config: IConfig = JSON.parse(props.config ?? '{}')

  const shouldWeShowHint =
    (config.hideTasksHint === undefined || !config.hideTasksHint) &&
    (config.hideAllHints === undefined || !config.hideAllHints)

  const { showHint, closeHint } = useHints(shouldWeShowHint)
  const { setAlert } = useAlertActions()

  const alertId = useId()

  if (!showHint) {
    return null
  }

  return (
    <div className='mb-8'>
      <Hint
        showHint={showHint}
        text='Displaying all tasks, sorted by the project with the most recently created task.'
        dismissCallback={() => {
          closeHint()
        }}
        dontShowCallback={() => {
          const newConfig: IConfig = {
            ...config,
            hideTasksHint: true
          }

          const cookieExpirationDate = new Date()
          cookieExpirationDate.setDate(cookieExpirationDate.getFullYear() + 10)

          document.cookie = `config=${JSON.stringify(
            newConfig
          )}; expires=${cookieExpirationDate.toUTCString()}; path=/`

          setAlert({
            id: alertId + '-hiding-hint-tasks',
            message:
              "We won't display this hint again. You can change this setting in the settings page.",
            type: 'success'
          })
          closeHint()
        }}
      />
    </div>
  )
}

export default TasksHint
