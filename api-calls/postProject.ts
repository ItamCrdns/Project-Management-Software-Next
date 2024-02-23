import { type OperationResult } from '@/interfaces/return/OperationResult'
import { type PostReturn } from '@/interfaces/return/PosterReturn'
import handlePost from '@/utility/poster'

const handleSubmitProject = async (
  formData: FormData
): Promise<PostReturn<OperationResult<number>>> => {
  return await handlePost('Project/new', formData)
}

export default handleSubmitProject
