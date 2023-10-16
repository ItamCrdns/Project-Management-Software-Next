import { type Option } from '@/components/select/select'
import { type Company } from '@/interfaces/company'

interface CompanyOptionProps {
  companies: Company[] | null
}

const useCompanyOptions = ({ companies }: CompanyOptionProps): Option[] | null => {
  const companyOptions = companies?.map((company: Company) => ({
    value: parseInt(company.companyId.toString()),
    label: company.name,
    info: ''
  }))

  return companyOptions ?? null
}

export default useCompanyOptions
