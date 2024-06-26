import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { Switch } from '@tremor/react'

const StartedWorkingSwitch: React.FC = () => {
  const { setStartedWorking } = useNewProjectActions()

  return (
    <div className='flex gap-2 items-center justify-center my-8'>
      <Switch
        defaultChecked={true}
        onChange={(value) => {
          setStartedWorking(value)
        }}
        tooltip='Start project after creation'
      />
      <p className='text-sm'>Project will start immediately</p>
    </div>
  )
}

export { StartedWorkingSwitch }
