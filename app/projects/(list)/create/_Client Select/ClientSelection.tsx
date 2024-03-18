import { getClients } from '@/api-calls/getClients'
import CustomSelect from '@/components/select/select'
import { type ClientSelectionProps } from '@/interfaces/props/ClientSelectionProps'
import { clientsAsOptions } from '@/utility/clientsAsOptions'
import { useState } from 'react'
import { useGetAndSetClient } from './useGetAndSetClient'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { ClearSelect } from '@/components/select/Clear'

const ClientSelection: React.FC<ClientSelectionProps> = (props) => {
  const { setCompany } = useNewProjectActions()
  useGetAndSetClient(props.searchParams.clientId)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { clients, isError } = getClients(currentPage, 5, true)

  if (isError !== undefined) {
    return <p className='text-xs text-center'>{isError?.toString()}</p>
  }

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className='flex items-center gap-4'>
      <div className='w-full'>
        <CustomSelect
          defaultValue={
            props.clientName === '' ? 'Select a client...' : props.clientName
          }
          options={clientsAsOptions(clients) ?? []}
          sendStateToParent={(client) => {
            setCompany(client.value, client.label)
          }}
          disabled={props.disabled}
          isPaginated
          pageSize={clients?.pages}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
          shouldShowDropdown={toggle}
          onShowDropdown={() => {
            setToggle(!toggle)
          }}
          closeDropdown={() => {
            setToggle(false)
          }}
        />
      </div>
      {props.clientName !== '' && (
        <ClearSelect
          callback={() => {
            setCompany(0, '')
          }}
        />
      )}
    </div>
  )
}

export { ClientSelection }
