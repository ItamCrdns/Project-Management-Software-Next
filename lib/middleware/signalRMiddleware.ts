import { Middleware } from '@reduxjs/toolkit'
import connection from './signalRInstance'
import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import {
  addNewTimelineEvent,
  setCurrentEvent,
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
          if (process.env.NODE_ENV === 'development') {
            store.dispatch(
              setAlert({
                id: 'signalR-connection-established',
                message: 'SignalR connection established',
                type: 'notification'
              })
            )
          }
        })
        .catch(() => {
          store.dispatch(
            setAlert({
              id: 'signalR-connection-failed',
              message:
                'SignalR connection failed, real-time updates will not be available.',
              type: 'notification'
            })
          )
        })
    }

    connection.on(EVENT_NAME, (event: Timeline) => {
      store.dispatch(addNewTimelineEvent(event))
      store.dispatch(setCurrentEvent(event))
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
