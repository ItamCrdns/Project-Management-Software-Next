import { signalRSlice } from '@/lib/features/signalR/signalRSlice'
import { useAppDispatch } from '../hooks'

export const useSignalRActions = () => {
  const dispatch = useAppDispatch()

  const startEventsHubConnection = () => {
    dispatch(signalRSlice.actions.startEventsHubConnection())
  }

  const startNotificationsHubConnection = () => {
    dispatch(signalRSlice.actions.startNotificationsHubConnection())
  }

  return { startEventsHubConnection, startNotificationsHubConnection }
}
