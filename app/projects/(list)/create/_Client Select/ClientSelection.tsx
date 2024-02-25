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
    return <p className='text-xs text-center'>{isError?.toString()}</p>
  }

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <CustomSelect
      defaultValue={
        props.clientName === '' ? 'Select a client...' : props.clientName
      }
      options={companyOptions ?? []}
      onSelect={props.handleClientSelection}
      disabled={props.isFormOpen}
      isPaginated
      pageSize={clients?.pages ?? 0}
      onPageChange={handlePageChange}
      showReset={props.clientName !== ''}
      shouldShowDropdown={toggle}
      onShowDropdown={() => {
        setToggle(!toggle)
      }}
      closeDropdown={() => {
        setToggle(false)
      }}
    />
  )
}

export default ClientSelection
