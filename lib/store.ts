import { configureStore } from '@reduxjs/toolkit'
import { newProjectSlice } from './features/new project/newProjectSlice'
import { newTaskSlice } from './features/new task/newTaskSlice'
import { alertSlice } from './features/alert/alertSlice'
import { entitySelectModeSlice } from './features/entity select mode/entitySelectModeSlice'

export const store = configureStore({
  reducer: {
    newProjectData: newProjectSlice.reducer,
    newTaskData: newTaskSlice.reducer,
    alert: alertSlice.reducer,
    entitySelectMode: entitySelectModeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
