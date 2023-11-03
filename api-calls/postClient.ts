import { type PostReturn } from '@/interfaces/return/PosterReturn'
import handlePost from '@/utility/poster'

const handleSubmitClient = async (
  formData: FormData
): Promise<PostReturn<number>> => {
  return await handlePost('Company/new/nameonly', formData)
}

export default handleSubmitClient
