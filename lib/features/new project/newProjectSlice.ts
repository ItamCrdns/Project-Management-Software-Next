import { type NewProjectData } from '@/interfaces/NewProjectData'
import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: NewProjectData = {
  name: '',
  description: '',
  companyId: 0,
  companyName: '',
  priority: 0,
  priorityLabel: '',
  employees: [],
  expectedDeliveryDate: '',
  startedWorking: true, // Default state value expects every project to start immediately
  clientName: '',
  pictures: []
}

export const newProjectSlice = createSlice({
  name: 'newProjectData',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Option>) => {
      state.companyId = action.payload.value
      state.companyName = action.payload.label
    },
    clearCompanyValues: (state) => {
      state.companyId = initialState.companyId
      state.companyName = initialState.companyName
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setClientName: (state, action: PayloadAction<string>) => {
      state.clientName = action.payload
    },
    setExpectedDeliveryDate: (state, action: PayloadAction<string>) => {
      state.expectedDeliveryDate = action.payload
    },
    setStartedWorking: (state, action: PayloadAction<boolean>) => {
      state.startedWorking = action.payload
    },
    setPriority: (state, action: PayloadAction<Option>) => {
      state.priority = action.payload.value
      state.priorityLabel = action.payload.label
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
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
    setPictures: (
      state,
      action: PayloadAction<{ file: File; id: string }[]>
    ) => {
      if (action.payload.length > 10) {
        state.pictures = action.payload.slice(0, 10)
        return
      }

      state.pictures = action.payload
    },
    removePicture: (state, action: PayloadAction<string>) => {
      state.pictures = state.pictures.filter((x) => x.id !== action.payload)
    },
    clear: () => initialState
  }
})

export default newProjectSlice.reducer

export const {
  setCompany,
  clearCompanyValues,
  setName,
  setClientName,
  setExpectedDeliveryDate,
  setStartedWorking,
  setPriority,
  setDescription,
  setEmployee,
  setPictures,
  clear
} = newProjectSlice.actions
