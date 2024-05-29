'use client'
import { useSignalRActions } from '@/lib/hooks/SignalR actions/useSignalRActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useEffect } from 'react'

const SignalRWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const status = useAppSelector((state) => state.signalR.status)

  const { startConnection } = useSignalRActions()

  useEffect(() => {
    if (status === 'disconnected') {
      startConnection()
    }
  }, [status])

  return children
}

export default SignalRWrapper
