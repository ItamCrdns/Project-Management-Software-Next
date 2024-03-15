import { type Option } from '@/interfaces/props/CustomSelectProps'
import { newProjectSlice } from '../../features/new project/newProjectSlice'
import { useAppDispatch } from '../hooks'
import { type Employee } from '@/interfaces/employee'
import { type UseNewProjectActionsReturn } from './UseNewProjectActions.interface'

export const useNewProjectActions = (): UseNewProjectActionsReturn => {
  const dispatch = useAppDispatch()

  const setCompany = (companyId: number, companyName: string): void => {
    dispatch(newProjectSlice.actions.setCompany({ value: companyId, label: companyName }))
  }

  const setName = (projectName: string): void => {
    dispatch(newProjectSlice.actions.setName(projectName))
  }

  const setClientName = (clientName: string): void => {
    dispatch(newProjectSlice.actions.setClientName(clientName))
  }

  const setExpectedDeliveryDate = (expectedDeliveryDate: string): void => {
    dispatch(newProjectSlice.actions.setExpectedDeliveryDate(expectedDeliveryDate))
  }

  const setStartedWorking = (value: boolean): void => {
    dispatch(newProjectSlice.actions.setStartedWorking(value))
  }

  const setPriority = (priority: Option): void => {
    dispatch(newProjectSlice.actions.setPriority(priority))
  }

  const setDescription = (description: string): void => {
    dispatch(newProjectSlice.actions.setDescription(description))
  }

  const setEmployee = (employee: Employee): void => {
    dispatch(newProjectSlice.actions.setEmployee(employee))
  }

  const clear = (): void => {
    dispatch(newProjectSlice.actions.clear())
  }

  return {
    setCompany, setName, setClientName, setExpectedDeliveryDate, setStartedWorking, setPriority, setDescription, setEmployee, clear
  }
}
