import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { useEffect, useId } from 'react'
import connection from './signalRConnection'
import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'

const EVENT_NAME = 'ReceiveTimelineEvent'

export const useSignalR = (
  callback: (event: Timeline) => void | Promise<void>
) => {
  const { setAlert } = useAlertActions()

  const alertId = useId()

  useEffect(() => {
    if (connection.state === 'Disconnected') {
      connection.start().catch(() => {
        setAlert({
          id: alertId + '-signalr-connection-failed',
          message: 'SignalR connection failed',
          type: 'error'
        })
      })
    }

    connection.on(EVENT_NAME, callback)

    return () => {
      connection.off(EVENT_NAME)
    }
  }, [alertId, EVENT_NAME, setAlert])
}
