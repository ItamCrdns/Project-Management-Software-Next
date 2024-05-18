'use client'
import { Divider } from '@tremor/react'

const HeaderDivider = ({
  text
}: {
  text: string
}) => {
  return (
    <Divider>
      <p className='font-bold text-lg'>{text}</p>
    </Divider>
  )
}

export default HeaderDivider
