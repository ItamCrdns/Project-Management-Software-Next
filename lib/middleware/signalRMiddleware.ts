import { Middleware } from '@reduxjs/toolkit'
import eventsConnection from './signalREventsInstance'
import notificationsConnection from './signalRNotificationsInstance'
import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { Notification } from '@/interfaces/Notification.interface'
import {
  addNewNotification,
  addNewTimelineEvent,
  setCurrentEvent,
  startEventsHubConnection,
  startNotificationsHubConnection
} from '../features/signalR/signalRSlice'
import { setAlert } from '../features/alert/alertSlice'

const RECEIVE_TIMELINE_EVENT = 'ReceiveTimelineEvent'
const RECEIVE_NOTIFICATION = 'ReceiveNotification'

export const signalRMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)

  if (
    startEventsHubConnection.match(action) &&
    eventsConnection.state === 'Disconnected'
  ) {
    eventsConnection
      .start()
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          store.dispatch(
            setAlert({
              id: 'signalR-events-connection-established',
              message: 'SignalR connection to events hub established',
              type: 'notification'
            })
          )
        }
      })
      .catch((error) => {
        store.dispatch(
          setAlert({
            id: 'signalR-events-connection-failed',
            message: `SignalR connection failed, real-time updates will not be available. ${error}`,
            type: 'error'
          })
        )
      })

    eventsConnection.on(RECEIVE_TIMELINE_EVENT, (event: Timeline) => {
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

  if (
    startNotificationsHubConnection.match(action) &&
    notificationsConnection.state === 'Disconnected'
  ) {
    notificationsConnection
      .start()
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          store.dispatch(
            setAlert({
              id: 'signalR-notifications-connection-established',
              message: 'SignalR connection to notifications hub established',
              type: 'notification'
            })
          )
        }
      })
      .catch((error) => {
        store.dispatch(
          setAlert({
            id: 'signalR-notifications-connection-failed',
            message: `SignalR connection failed, real-time notifications will not be available. ${error}`,
            type: 'error'
          })
        )
      })

    notificationsConnection.on(
      RECEIVE_NOTIFICATION,
      (notification: Notification) => {
        store.dispatch(addNewNotification(notification))
        store.dispatch(
          setAlert({
            id: 'new-notification-' + notification.notificationId,
            message: notification.name,
            type: 'notification'
          })
        )
      }
    )
  }
}
