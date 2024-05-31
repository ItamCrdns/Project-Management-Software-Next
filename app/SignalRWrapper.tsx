'use client'
import { useSignalRActions } from '@/lib/hooks/SignalR actions/useSignalRActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useEffect } from 'react'

const SignalRWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const signalR = useAppSelector((state) => state.signalR)

  const { startEventsHubConnection, startNotificationsHubConnection } =
    useSignalRActions()

  // TODO: If not logged in connection fails, if we login we dont connect to hubs automatically we need to refresh the page. Connection should be established automatically?
  useEffect(() => {
    if (signalR.eventsHubStatus === 'disconnected') {
      startEventsHubConnection()
    }

    if (signalR.notificationsHubStatus === 'disconnected') {
      startNotificationsHubConnection()
    }
  }, [signalR])

  return children
}

export default SignalRWrapper
