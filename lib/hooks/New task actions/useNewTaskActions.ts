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

  const setCreated = (created: string): void => {
    dispatch(newTaskSlice.actions.setCreated(created))
  }

  const setExpectedDeliveryDate = (startedWorking: string): void => {
    dispatch(newTaskSlice.actions.setExpectedDeliveryDate(startedWorking))
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

  const clear = (): void => {
    dispatch(newTaskSlice.actions.clear())
  }

  return {
    setName, setDescription, setCreated, setExpectedDeliveryDate, setFinished, setTaskCreatorId, setProjectId, clear
  }
}
