'use server'
import { handleCreateClient } from '@/api-calls/createClient'

export const createClient = async (clientName: string): Promise<number | null> => {
  const res = await handleCreateClient(clientName)

  return res.data
}
