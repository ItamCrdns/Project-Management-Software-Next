import { Close } from '@/svg/Close'
import Link from 'next/link'
import React from 'react'

const ReturnBadgeLink = ({ path }: { path: string }) => {
  return (
    <Link
      href={path}
      className='rounded-full bg-black dark:bg-white flex items-center justify-center w-[100px]'
    >
      <p className='text-white dark:text-black'>Close</p>
      <Close color='text-white dark:text-black' />
    </Link>
  )
}

export default ReturnBadgeLink
