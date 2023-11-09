import { type IEntity } from '@/interfaces/props/context props/IEntity'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { useEffect, useState } from 'react'

interface EntitySetterProps<T> {
  entityT: SWRGetterReturn<T> | undefined
  entityU: IEntity
  entityName: keyof IEntity
  updateEntity: (key: keyof IEntity, props: IEntity) => void
}

const entitySetter = <T>(props: EntitySetterProps<T>): void => {
  const { entityT, entityU, entityName, updateEntity } = props
  const [hasEffectRun, setHasEffectRun] = useState<boolean>(false)

  useEffect(() => {
    // ! Avoid re-render of the total entity<T> count
    if (!hasEffectRun && entityT !== undefined) {
      const newState = { ...entityU, count: entityT.count }
      updateEntity(entityName, newState)

      setHasEffectRun(true)
    }
  }, [entityT, hasEffectRun])
}

export default entitySetter
