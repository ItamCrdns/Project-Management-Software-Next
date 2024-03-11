import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Alert } from './alert.interface'

const initialState: Alert = {
  message: '',
  type: '',
  show: false
//   setShow: () => {}
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.message = action.payload.message
      state.type = action.payload.type
      state.show = true
    },
    hideAlert: (state) => {
      state.show = false
    }
  }
})

export default alertSlice.reducer

export const { setAlert } = alertSlice.actions
