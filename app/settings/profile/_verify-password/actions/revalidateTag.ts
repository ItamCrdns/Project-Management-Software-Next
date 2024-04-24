'use server'
import { revalidateTag } from 'next/cache'

export const revalidatePasswordTag = async (): Promise<void> => {
  revalidateTag('passwordverification')
}
