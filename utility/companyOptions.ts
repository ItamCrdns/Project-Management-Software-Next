import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type Company } from '@/interfaces/company'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'

interface CompanyOptionProps {
  clients: SWRGetterReturn<Company> | undefined
}

const useCompanyOptions = ({
  clients
}: CompanyOptionProps): Option[] | null => {
  const companyOptions = clients?.data.map((company: Company) => ({
    value: parseInt(company.companyId.toString()),
    label: company.name,
    info: ''
  }))

  return companyOptions ?? null
}

export default useCompanyOptions
