import CustomSelect from '@/components/select/select'
import { type ClientSelectionProps } from '@/interfaces/props/ClientSelectionProps'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import useCompanyOptions from '@/utility/companyOptions'
import { useState } from 'react'

const ClientSelection: React.FC<ClientSelectionProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<string>('1')
  const { companies, error } = useCompanyDropdown({
    dependency: true,
    page: currentPage
  })

  const companyOptions = useCompanyOptions({ companies })

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  if (error !== null) {
    return (
      <p style={{ fontSize: '8px', textAlign: 'center' }}>{error.toString()}</p>
    )
  }

  return (
    <CustomSelect
      defaultValue={props.clientName}
      options={companyOptions ?? []}
      text="client"
      onSelect={props.handleClientSelection}
      width="100%"
      disabled={props.isFormOpen}
      clearSelectedOption={props.clearSelectedOption}
      isPaginated
      iconSize="24px"
      pageSize={companies?.pageSize ?? 0}
      onPageChange={handlePageChange}
      showReset
    />
  )
}

export default ClientSelection
