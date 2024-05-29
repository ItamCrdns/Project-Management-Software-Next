import { Timeline } from '@/app/dashboard/@admin/(admin layout)/@timeline/Timeline.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SignalR } from './SignalR.interface'

const initialState: SignalR = {
  status: 'disconnected',
  events: {
    data: [],
    count: 0,
    pages: 0
  }
}

export const signalRSlice = createSlice({
  name: 'signalR',
  initialState,
  reducers: {
    receiveTimelineEvent: (state, action: PayloadAction<Timeline>) => {
      if (
        !state.events.data.some(
          (x) => x.timelineId === action.payload.timelineId
        )
      ) {
        state.events.data.unshift(action.payload)
        state.events.count += 1
      }
    },
    startConnection: (state) => {
      state.status = 'connected'
    }
  }
})

export default signalRSlice.reducer

export const { receiveTimelineEvent, startConnection } = signalRSlice.actions
