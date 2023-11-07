import CustomSelect from '@/components/select/select'
import { type ClientSelectionProps } from '@/interfaces/props/ClientSelectionProps'
import useCompanyDropdown from '@/utility/CompanyDropdown'
import useCompanyOptions from '@/utility/companyOptions'
import { useState } from 'react'

const ClientSelection: React.FC<ClientSelectionProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<string>('1')
  const { clients, isError } = useCompanyDropdown({
    page: currentPage
  })

  const companyOptions = useCompanyOptions({ clients })

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  if (isError !== undefined) {
    return (
      <p style={{ fontSize: '8px', textAlign: 'center' }}>
        {isError?.toString()}
      </p>
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
      pageSize={clients?.pages ?? 0}
      onPageChange={handlePageChange}
      showReset
    />
  )
}

export default ClientSelection
