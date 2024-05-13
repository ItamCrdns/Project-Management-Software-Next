'use server'
import { redirect } from 'next/navigation'

export const onSuccessfulChange = async (username: string): Promise<void> =>
  redirect(`/login?username=${username}`)
