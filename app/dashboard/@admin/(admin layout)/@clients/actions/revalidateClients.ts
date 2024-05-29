'use server'
import { revalidateTag } from 'next/cache'

export const revalidateClients = async () => {
  revalidateTag('getClientsServer')
}
