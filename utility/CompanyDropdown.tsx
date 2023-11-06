import getClients from '@/api-calls/getClients'
import {
  type CompanyDropDownResult,
  type CompanyDropdownProps
} from '@/interfaces/props/CompanyDropdownProps'

const useCompanyDropdown = (
  props: CompanyDropdownProps
): CompanyDropDownResult => {
  const page = props.page ?? '1'
  const pageSize = '5'
  const shouldFetch = props.shouldFetch ?? true // ? Since shouldFetch its nullable sometimes the user will not pass it, in that case: just fetch

  const { clients, isError } = getClients(page, pageSize, shouldFetch)
  return { clients, isError }
}

export default useCompanyDropdown
