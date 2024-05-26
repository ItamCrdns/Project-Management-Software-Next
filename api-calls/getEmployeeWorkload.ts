import { Workload } from '@/interfaces/Workload'
import fetcher from '@/utility/fetcher'

export const getEmployeeWorkload = async (username: string) =>
  await fetcher<Workload>(
    `${process.env.NEXT_PUBLIC_API_URL}Workload/${username}`
  )
