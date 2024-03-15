'use server'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { handlePost } from '@/utility/api/handlePost'

export const createProject = async (formData: FormData): Promise<OperationResult<number> | null> => {
  const res = await handlePost<OperationResult<number>>('Project/new', formData)

  return res.data
}
