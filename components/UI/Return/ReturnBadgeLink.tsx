import { Return } from '@/svg/Return'
import { Badge } from '@tremor/react'
import Link from 'next/link'
import React from 'react'

const ReturnBadgeLink: React.FC<{ path: string }> = (props) => {
  return (
    <Badge
      icon={Return}
      className='flex self-end gap-2 items-cente -m-2 mb-4 cursor-pointer'
    >
      <Link href={props.path}>Return</Link>
    </Badge>
  )
}

export default ReturnBadgeLink
