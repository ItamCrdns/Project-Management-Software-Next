'use client'
import { Divider } from '@tremor/react'

// * Children should only be icons from /svg
const EntityDivider: React.FC<{ text: string, children: React.ReactNode }> = (
  props
) => {
  return (
    <div className='flex items-center justify-center mb-8 w-full'>
      <Divider>
        <div className='flex gap-2 items-center'>
          <p className='font-semibold'>{props.text}</p> {props.children}
        </div>
      </Divider>
    </div>
  )
}

export { EntityDivider }
