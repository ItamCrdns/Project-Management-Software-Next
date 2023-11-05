import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type Company } from '@/interfaces/company'
import { type ClientDataAndPageSize } from '@/interfaces/return/ClientDataAndPageSizeReturn'

interface CompanyOptionProps {
  companies: ClientDataAndPageSize | null
}

const useCompanyOptions = ({
  companies
}: CompanyOptionProps): Option[] | null => {
  const companyOptions = companies?.data.map((company: Company) => ({
    value: parseInt(company.companyId.toString()),
    label: company.name,
    info: ''
  }))

  return companyOptions ?? null
}

export default useCompanyOptions
