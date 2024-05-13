import { Divider } from '@tremor/react'
import { Button } from '../Button/Button'
import { useEntitySelectModeActions } from '@/lib/hooks/Entity select mode actions/useEntitySelectModeActions'
import { useAppSelector } from '@/lib/hooks/hooks'

const Actions = () => {
  const { setEnabled, setDisabled } = useEntitySelectModeActions()

  const entityOnSelectMode = useAppSelector(
    (state) => state.entitySelectMode.entity
  )

  return (
    <div className='-mt-4 flex items-center justify-center flex-col mb-4'>
      <Divider>Actions</Divider>
      <div className='w-full'>
        <Button
          text='Set projects finished'
          borderOnly={true}
          txtColor='black'
          func={() => {
            if (entityOnSelectMode === 'ongoingProjects') {
              setDisabled()
            } else {
              setEnabled('ongoingProjects')
            }
          }}
        />
      </div>
    </div>
  )
}

export { Actions }
