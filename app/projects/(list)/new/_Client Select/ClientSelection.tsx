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

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <CustomSelect
      defaultValue={props.clientName}
      options={companyOptions ?? []}
      text='Select a client...'
      onSelect={props.handleClientSelection}
      disabled={props.isFormOpen}
      clearSelectedOption={props.clearSelectedOption}
      isPaginated
      pageSize={clients?.pages ?? 0}
      onPageChange={handlePageChange}
      showReset
      shouldShowDropdown={toggle}
      onShowDropdown={() => { setToggle(!toggle) }}
      resetActiveDropdown={() => { setToggle(false) }}
    />
  )
}

export default ClientSelection
