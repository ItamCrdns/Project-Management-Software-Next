import { type IEntity } from './IEntity'
import { type IFilterProperties, type IFilter } from './IFilter'

export interface FilterContextType {
  filter: IFilter
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void
  clearFilter: () => void
  entity: IEntity
  updateEntity: (key: keyof IEntity, props: IEntity) => void
}
