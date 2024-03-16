import { type Employee } from '@/interfaces/employee'
import { newTaskSlice } from '../../features/new task/newTaskSlice'
import { useAppDispatch } from '../hooks'
import { type useNewTaskActionsReturn } from './UseNewTaskActions.interface'

export const useNewTaskActions = (): useNewTaskActionsReturn => {
  const dispatch = useAppDispatch()

  const setName = (name: string): void => {
    dispatch(newTaskSlice.actions.setName(name))
  }

  const setDescription = (description: string): void => {
    dispatch(newTaskSlice.actions.setDescription(description))
  }

  const setExpectedDeliveryDate = (expectedDeliveryDate: string): void => {
    dispatch(newTaskSlice.actions.setExpectedDeliveryDate(expectedDeliveryDate))
  }

  const setStartedWorking = (value: boolean): void => {
    dispatch(newTaskSlice.actions.setStartedWorking(value))
  }

  const setFinished = (finished: string): void => {
    dispatch(newTaskSlice.actions.setFinished(finished))
  }

  const setTaskCreatorId = (taskCreatorId: number): void => {
    dispatch(newTaskSlice.actions.setTaskCreatorId(taskCreatorId))
  }

  const setProjectId = (projectId: number): void => {
    dispatch(newTaskSlice.actions.setProjectId(projectId))
  }

  const setEmployee = (employee: Employee): void => {
    dispatch(newTaskSlice.actions.setEmployee(employee))
  }

  const clear = (): void => {
    dispatch(newTaskSlice.actions.clear())
  }

  return {
    setName, setDescription, setExpectedDeliveryDate, setStartedWorking, setFinished, setTaskCreatorId, setProjectId, setEmployee, clear
  }
}
