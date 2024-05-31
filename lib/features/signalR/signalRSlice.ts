import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SignalR } from './SignalR.interface'
import { Notification } from '@/interfaces/Notification.interface'

const initialState: SignalR = {
  eventsHubStatus: 'disconnected',
  notificationsHubStatus: 'disconnected',
  events: {
    data: [],
    count: 0,
    pages: 0
  },
  notifications: {
    data: [],
    count: 0,
    pages: 0
  },
  currentEvent: null
}

export const signalRSlice = createSlice({
  name: 'signalR',
  initialState,
  reducers: {
    startEventsHubConnection: (state) => {
      state.eventsHubStatus = 'connecting'
    },
    addNewTimelineEvent: (state, action: PayloadAction<Timeline>) => {
      if (
        !state.events.data.some(
          (x) => x.timelineId === action.payload.timelineId
        )
      ) {
        state.events.data.unshift(action.payload)
        state.events.count += 1
      }
    },
    setCurrentEvent: (state, action: PayloadAction<Timeline>) => {
      state.currentEvent = action.payload
    },
    startNotificationsHubConnection: (state) => {
      state.notificationsHubStatus = 'connecting'
    },
    addNewNotification: (state, action: PayloadAction<Notification>) => {
      if (
        !state.notifications.data.some(
          (x) => x.notificationId === action.payload.notificationId
        )
      ) {
        state.notifications.data.unshift(action.payload)
        state.notifications.count += 1
      }
    }
  }
})

export default signalRSlice.reducer

export const {
  startEventsHubConnection,
  addNewTimelineEvent,
  setCurrentEvent,
  startNotificationsHubConnection,
  addNewNotification
} = signalRSlice.actions
