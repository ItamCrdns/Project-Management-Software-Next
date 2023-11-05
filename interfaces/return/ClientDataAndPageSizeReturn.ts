import { type Company } from '../company'

export interface ClientDataAndPageSize {
  data: Company[]
  status: number
  pageSize: number
}
