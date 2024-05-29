import { signalRSlice } from '@/lib/features/signalR/signalRSlice'
import { useAppDispatch } from '../hooks'

export const useSignalRActions = () => {
  const dispatch = useAppDispatch()

  const startConnection = () => {
    dispatch(signalRSlice.actions.startConnection())
  }

  return { startConnection }
}
