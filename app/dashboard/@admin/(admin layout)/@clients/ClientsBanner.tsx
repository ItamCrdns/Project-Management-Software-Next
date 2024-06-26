'use client'
import { DataCountPages } from '@/interfaces/DataCountPages.interface'
import Link from 'next/link'
import ClientsList from './ClientsList'
import { CompanyAndCounts } from '@/interfaces/companyAndCounts'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useEffect } from 'react'
import { revalidateClients } from './actions/revalidateClients'

const ClientsBanner: React.FC<{
  clients: DataCountPages<CompanyAndCounts>
}> = (props) => {
  const { data: clients, count } = props.clients

  const event = useAppSelector((state) => state.signalR.currentEvent)

  useEffect(() => {
    const revalidate = async () => {
      if (event && event?.project !== null && event.type === 'Create') {
        await revalidateClients()
      }
    }

    revalidate()
  }, [event])

  return (
    <div className='p-8 my-8 rounded-md shadow-md min-w-[350px] bg-theming-white100 dark:bg-theming-dark300 flex flex-col justify-center'>
      <h1 className='font-semibold mb-4'>Clients</h1>
      <ClientsList clients={clients} />
      {count > 0 && (
        <Link
          href='/clients'
          className='mt-4 font-semibold text-center text-sm'
        >
          See all {count} clients
        </Link>
      )}
    </div>
  )
}

export default ClientsBanner
