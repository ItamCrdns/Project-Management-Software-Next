import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { Switch } from '@tremor/react'

const StartedWorkingSwitch: React.FC = () => {
  const { setStartedWorking } = useNewProjectActions()

  return (
    <div className='flex gap-2 items-center justify-center mb-4'>
      <Switch
        defaultChecked={true}
        onChange={(value) => {
          setStartedWorking(value)
        }}
        tooltip='Toggle to start working on this project'
      />
      <p className='text-sm'>Project will start immediately</p>
    </div>
  )
}

export { StartedWorkingSwitch }
