import Link from 'next/link'
import { Filters } from './Filters'
import { getCompany } from '@/api-calls/getCompanyById'

const CompanyUI: React.FC<{ clientId: string }> = async (props) => {
  const { data } = await getCompany(props.clientId)

  return (
    <aside className='flex flex-col items-center gap-8 max-w-sm'>
      <div className='flex flex-col gap-8 w-80'>
        <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href=''
          >
            {data?.name}
          </Link>
          <div className='flex items-start gap-4'>
            <p className='text-xs'>{data?.contactEmail}</p>
            <p className='select-none text-xs'>&middot;</p>
            <p className='text-xs'>{data?.contactPhoneNumber}</p>
          </div>
        </div>
        <Filters />
      </div>
    </aside>
  )
}

export { CompanyUI }
