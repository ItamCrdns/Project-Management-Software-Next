import { getClients } from '@/api-calls/getClients'
import CustomSelect from '@/components/select/select'
import { type ClientSelectionProps } from '@/interfaces/props/ClientSelectionProps'
import { clientsAsOptions } from '@/utility/clientsAsOptions'
import { useState } from 'react'
import { useGetAndSetClient } from './useGetAndSetClient'

const ClientSelection: React.FC<ClientSelectionProps> = (props) => {
  const { clientId } = props.searchParams
  useGetAndSetClient(clientId)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { clients, isError } = getClients(currentPage, 5, true)

  if (isError !== undefined) {
    return <p className='text-xs text-center'>{isError?.toString()}</p>
  }

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <CustomSelect
      defaultValue={
        props.clientName === '' ? 'Select a client...' : props.clientName
      }
      options={clientsAsOptions(clients) ?? []}
      sendStateToParent={props.handleClientSelection}
      disabled={props.isFormOpen}
      isPaginated
      pageSize={clients?.pages ?? 0}
      onPageChange={(page) => {
        setCurrentPage(page)
      }}
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

export { ClientSelection }
