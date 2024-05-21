'use server'
import { revalidateTag } from 'next/cache'

export const revalidateProjectTasks = async () => {
  revalidateTag('getProjectTasks')
}
