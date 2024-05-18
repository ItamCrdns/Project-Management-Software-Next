import { getCompany } from '@/api-calls/getCompanyById'
import Link from 'next/link'

const ClientIdPage = async ({
  params: { clientId }
}: {
  params: {
    clientId: string
  }
}) => {
  const { data } = await getCompany(clientId)
  return (
    <div className='flex justify-center items-center p-8'>
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
    </div>
  )
}

export default ClientIdPage
