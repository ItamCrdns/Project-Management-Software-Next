import { type Company } from '../company'
import { type SWRGetterReturn } from '../return/SWRGetterReturn'

export interface CompanyDropdownProps {
  page?: string
  shouldFetch?: boolean
}

export interface CompanyDropDownResult {
  clients: SWRGetterReturn<Company> | undefined
  isError: unknown
}
