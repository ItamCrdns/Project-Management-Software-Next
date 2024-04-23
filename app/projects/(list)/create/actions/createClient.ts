'use server'

import { handleCreateClient } from '@/api-calls/post/createClient'

export const createClient = async (clientName: string): Promise<number | null> => {
  const res = await handleCreateClient(clientName)

  return res.data
}
