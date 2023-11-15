import { type SearchParams } from '../searchParams'

interface SearchParamsPageSize extends SearchParams {
  pageSize: string
}

export interface ClientNameProps {
  params: {
    client: string[]
  }
  searchParams: SearchParamsPageSize
}
