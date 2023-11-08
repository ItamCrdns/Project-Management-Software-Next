import { type IEntity } from './IEntity'
import { type IFilter } from './IFilter'

export interface FilterContextType {
  filter: IFilter
  updateFilter: (key: keyof IFilter, props: IFilter) => void
  clearFilter: () => void
  entity: IEntity
  updateEntity: (props: IEntity) => void
}
