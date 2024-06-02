import { useNewTaskActions } from '@/lib/hooks/New task actions/useNewTaskActions'
import { Switch } from '@tremor/react'
import React from 'react'

const StartedWorkingSwitch: React.FC = () => {
  const { setStartedWorking } = useNewTaskActions()

  return (
    <div className='flex gap-2 items-center justify-center my-4'>
      <Switch
        defaultChecked={true}
        onChange={(value) => {
          setStartedWorking(value)
        }}
        tooltip='Start project after creation'
      />
      <p className='text-sm'>Task will start immediately</p>
    </div>
  )
}

export { StartedWorkingSwitch }
