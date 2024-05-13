'use client'
import { useEntitySelectModeActions } from '@/lib/hooks/Entity select mode actions/useEntitySelectModeActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { Switch } from '@tremor/react'

const SelectEntity: React.FC<{ entityIdentifier?: string; id: number }> = (
  props
) => {
  const { setId } = useEntitySelectModeActions()

  const entityOnSelectMode = useAppSelector((state) => state.entitySelectMode)

  if (entityOnSelectMode.entity === props.entityIdentifier) {
    return (
      <div className='ml-8'>
        <Switch
          color='red'
          checked={entityOnSelectMode.selectedIds.some((x) => x === props.id)}
          onChange={() => {
            setId(props.id)
          }}
        />
      </div>
    )
  }
}

export default SelectEntity
