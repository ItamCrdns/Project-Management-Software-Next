'use server'
import { logoutTimelineEvent } from '@/api-calls/post/logoutTimelineEvent'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async (): Promise<void> => {
  await logoutTimelineEvent()

  cookies().delete('JwtToken')

  redirect('/login')
}
