import Link from 'next/link'
import { Filters } from './Filters'
import { getCompany } from '@/api-calls/getCompanyById'
import getEmployeeTier from '@/api-calls/getEmployeeTier'
import CreateNewProjectButton from './CreateNewProjectButton'
import { redirect } from 'next/navigation'

const ClientInfoAndFilters: React.FC<{ clientId: string }> = async (props) => {
  const { clientId } = props

  const { data, status } = await getCompany(clientId)

  if (data === null && status === 404) {
    redirect('/')
  }

  const { data: employeeTier } = await getEmployeeTier()

  return (
    <aside className='flex flex-col items-center gap-8 max-w-sm'>
      <div className='flex flex-col gap-8 w-80'>
        <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href={`/clients/${clientId}`}
          >
            {data?.name}
          </Link>
          <div className='flex items-start gap-4'>
            <p className='text-xs'>{data?.contactEmail}</p>
            <p className='select-none text-xs'>&middot;</p>
            <p className='text-xs'>{data?.contactPhoneNumber}</p>
          </div>
        </div>
        <CreateNewProjectButton clientId={clientId} />
        <Filters employeeTier={employeeTier} clientId={clientId} />
      </div>
    </aside>
  )
}

export { ClientInfoAndFilters }
