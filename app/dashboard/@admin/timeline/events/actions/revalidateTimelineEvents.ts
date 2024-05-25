'use server'
import { revalidateTag } from 'next/cache'

export const revalidateTimelineEvents = async () => {
  revalidateTag('getTimelineEvents')
}
