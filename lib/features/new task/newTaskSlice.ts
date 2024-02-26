import { createSlice } from '@reduxjs/toolkit'
import { type NewTaskData } from './NewTask.interface'

const initialState: NewTaskData = {
  name: '',
  description: '',
  created: '',
  startedWorking: '',
  finished: '',
  taskCreatorId: 0,
  projectId: 0
}

export const newTaskSlice = createSlice({
  name: 'newTaskData',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setCreated: (state, action) => {
      state.created = action.payload
    },
    setExpectedDeliveryDate: (state, action) => {
      state.startedWorking = action.payload
    },
    setFinished: (state, action) => {
      state.finished = action.payload
    },
    setTaskCreatorId: (state, action) => {
      state.taskCreatorId = action.payload
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
    clear: () => initialState
  }
})

export default newTaskSlice.reducer

export const { setName, setDescription, setCreated, setExpectedDeliveryDate, setFinished, setTaskCreatorId, setProjectId, clear } = newTaskSlice.actions
