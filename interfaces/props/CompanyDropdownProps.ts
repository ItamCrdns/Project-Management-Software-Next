import { type ClientDataAndPageSize } from '../return/ClientDataAndPageSizeReturn'

export interface CompanyDropdownProps {
  dependency: boolean
  page?: string
}

export interface CompanyDropDownResult {
  companies: ClientDataAndPageSize | null
  error: string | null
}
