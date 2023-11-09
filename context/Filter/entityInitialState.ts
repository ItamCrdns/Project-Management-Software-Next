import {
  type IEntityProperties,
  type IEntity
} from '@/interfaces/props/context props/IEntity'

export const entityProperties: IEntityProperties = {
  pages: 0,
  count: 0
}

export const entityInitialState: IEntity = {
  projects: entityProperties,
  tasks: entityProperties,
  issues: entityProperties
}
