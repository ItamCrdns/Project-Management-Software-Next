import { type Company } from '@/interfaces/company'
import fetcher from '@/utility/fetcher'

export const getCompany = async (id: string): Promise<{ data: Company | null, status: number }> => await fetcher(`${process.env.NEXT_PUBLIC_API_URL}Company/${id}`)
