import { Company } from '@/interfaces/company'
import Link from 'next/link'
import React from 'react'

const ClientUI: React.FC<{ clientId: string; client: Company | null }> = (
  props
) => {
  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-[400px]'>
      <Link
        className='font-bold text-theming-dark100 dark:text-theming-white100'
        href={`/clients/${props.clientId}`}
      >
        {props.client?.name}
      </Link>
      <div className='flex items-start gap-4'>
        <p className='text-xs'>{props.client?.contactEmail}</p>
        <p className='select-none text-xs'>&middot;</p>
        <p className='text-xs'>{props.client?.contactPhoneNumber}</p>
      </div>
    </div>
  )
}

export default ClientUI
