import { DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { useEffect, useId, useState } from 'react'
import connection from './signalRConnection'
import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'

export const useSignalR = (
  eventName: string,
  prevData: DictionaryResponse<Timeline>
) => {
  const { setAlert } = useAlertActions()

  const alertId = useId()

  // State to hold old data + new data from hub
  const [timelineData, setTimelineData] =
    useState<DictionaryResponse<Timeline>>(prevData)

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

    connection.on(eventName, (event: Timeline) => {
      setAlert({
        id: alertId + '-new-event' + event.timelineId,
        message: event.eventText.trimEnd(),
        type: 'notification'
      })

      setTimelineData((prevData) => {
        const newData = [...(prevData.data ?? [])]

        newData.unshift(event)

        if (newData.length > 1) {
          newData.pop() // remove the last element
        }

        return {
          data: newData,
          count: prevData.count + 1,
          pages: prevData.pages // Maybe we need to recalculate this?
        }
      })
    })

    return () => {
      connection.off(eventName)
    }
  }, [connection])

  return timelineData
}
