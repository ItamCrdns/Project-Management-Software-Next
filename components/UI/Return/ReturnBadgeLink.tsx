import { Close } from '@/icons/Close'
import Link from 'next/link'
import React from 'react'

const ReturnBadgeLink = ({ path }: { path: string }) => {
  return (
    <Link
      href={path}
      className='rounded-full bg-azure-radiance-400 p-2 flex items-center justify-center'
    >
      <Close color='text-white' />
    </Link>
  )
}

export default ReturnBadgeLink
