import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type Company } from '@/interfaces/company'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'

export const clientsAsOptions = (
  clients: SWRGetterReturn<Company> | undefined): Option[] | undefined => {
  return clients?.data.map((x: Company) => ({
    value: x.companyId,
    label: x.name,
    info: ''
  }))
}
