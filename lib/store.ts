import { configureStore } from '@reduxjs/toolkit'
import { newProjectSlice } from './features/new project/newProjectSlice'
import { newTaskSlice } from './features/new task/newTaskSlice'

export const store = configureStore({
  reducer: {
    newProjectData: newProjectSlice.reducer,
    newTaskData: newTaskSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
