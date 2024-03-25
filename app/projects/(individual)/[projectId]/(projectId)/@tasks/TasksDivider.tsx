'use client'
import { Task } from '@/svg/Task'
import { Divider } from '@tremor/react'

const TasksDivider: React.FC = () => {
  return (
    <div className='flex items-center justify-center mb-8 w-full'>
    <Divider>
      <div className='flex gap-2 items-center'>
        <p className='font-semibold'>Tasks</p> <Task />
      </div>
    </Divider>
    </div>
  )
}

export { TasksDivider }
