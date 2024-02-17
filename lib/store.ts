import { type Middleware, configureStore } from '@reduxjs/toolkit'
import { newProjectSlice } from './features/new project/newProjectSlice'

const middleware: Middleware = (store) => (next) => (action) => {
  next(action)
}

export const store = configureStore({
  reducer: {
    newProjectData: newProjectSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
