import { type ApiResponse } from '@/interfaces/apiResponse'
import { type Task } from '@/interfaces/task'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'
import idFetcher from '@/utility/idFetcher'

export const getTask = async (id: string): Promise<ApiResponse<Data<Task>>> => await idFetcher('Task', id)
