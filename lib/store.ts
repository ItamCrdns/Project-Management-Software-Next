import { configureStore } from '@reduxjs/toolkit'
import { newProjectSlice } from './features/new project/newProjectSlice'
import { newTaskSlice } from './features/new task/newTaskSlice'
import { alertSlice } from './features/alert/alertSlice'

export const store = configureStore({
  reducer: {
    newProjectData: newProjectSlice.reducer,
    newTaskData: newTaskSlice.reducer,
    alert: alertSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
