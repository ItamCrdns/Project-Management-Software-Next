import { Middleware } from '@reduxjs/toolkit'
import connection from './signalRInstance'
import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import {
  receiveTimelineEvent,
  startConnection
} from '../features/signalR/signalRSlice'
import { setAlert } from '../features/alert/alertSlice'

const EVENT_NAME = 'ReceiveTimelineEvent'

export const signalRMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)

  if (startConnection.match(action)) {
    if (connection.state === 'Disconnected') {
      connection
        .start()
        .then(() => {
          store.dispatch(
            setAlert({
              id: 'signalR-connection-established',
              message: 'SignalR connection established',
              type: 'notification'
            })
          )
        })
        .catch(() => {
          store.dispatch(
            setAlert({
              id: 'signalR-connection-failed',
              message: 'SignalR connection failed',
              type: 'notification'
            })
          )
        })
    }

    connection.on(EVENT_NAME, (event: Timeline) => {
      store.dispatch(receiveTimelineEvent(event))
      store.dispatch(
        setAlert({
          id: 'new-event-' + event.timelineId,
          message: event.eventText.trimEnd(),
          type: 'notification'
        })
      )
    })
  }
}
