'use server'
import { revalidateTag } from 'next/cache'

export const revalidateOngoingFinishedAndOverdueProjects = async () => {
  revalidateTag('getOngoingProjectsByClient')
  revalidateTag('getFinishedProjectsByClient')
  revalidateTag('getOverdueProjectsByClient')
}
