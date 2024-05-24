import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Alert } from './alert.interface'

const initialState: Alert[] = []

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      // Check if the alert is already in the state
      if (state.some((x) => x.id === action.payload.id)) {
        return state
      }

      state.push(action.payload)
    },
    hideAlert: (state, action: PayloadAction<string>) => {
      return state.filter((alert) => alert.id !== action.payload)
    },
    hideAllAlerts: () => initialState
  }
})

export default alertSlice.reducer

export const { setAlert, hideAlert } = alertSlice.actions
