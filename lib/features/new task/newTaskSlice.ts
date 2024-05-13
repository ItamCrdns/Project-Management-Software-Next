import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type NewTaskData } from './NewTask.interface'
import { type Employee } from '@/interfaces/employee'

const initialState: NewTaskData = {
  name: '',
  description: '',
  created: '',
  startedWorking: true,
  expectedDeliveryDate: '',
  finished: '',
  taskCreatorId: 0,
  projectId: 0,
  employees: []
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
    setExpectedDeliveryDate: (state, action: PayloadAction<string>) => {
      state.expectedDeliveryDate = action.payload
    },
    setStartedWorking: (state, action: PayloadAction<boolean>) => {
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
    setEmployee: (state, action: PayloadAction<Employee>) => {
      const employees = state.employees

      if (employees?.some((x) => x.employeeId === action.payload.employeeId)) {
        state.employees = employees.filter(
          (x) => x.employeeId !== action.payload.employeeId
        )
      } else {
        state.employees = [...(employees ?? []), action.payload]
      }
    },
    clear: () => initialState
  }
})

export default newTaskSlice.reducer

export const {
  setName,
  setDescription,
  setCreated,
  setExpectedDeliveryDate,
  setStartedWorking,
  setFinished,
  setTaskCreatorId,
  setProjectId,
  setEmployee,
  clear
} = newTaskSlice.actions
