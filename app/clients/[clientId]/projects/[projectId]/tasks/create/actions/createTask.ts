'use server'
import { type ApiResponse } from '@/interfaces/apiResponse'
import { type OperationResult } from '@/interfaces/return/OperationResult'
import { handlePost } from '@/utility/api/handlePost'

export const createTask = async (
  formData: FormData
): Promise<ApiResponse<OperationResult<number>> | null> =>
  await handlePost('TaskManagement/create', formData)
