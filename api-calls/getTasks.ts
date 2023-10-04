import paginatedFetcher from '@/utility/paginatedFetcher'
import { type Task } from '@/interfaces/task'

const getTasks = async (page: string, pageSize: string): Promise<{ data: Task | null, status: number }> => await paginatedFetcher('Task/all', page, pageSize)

export default getTasks
