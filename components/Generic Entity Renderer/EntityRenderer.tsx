import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import EntityCreator from './EntityCreator'
import EntityEmployees from './EntityEmployees'
import { setEntityPriority } from './EntityPriority'
import { DateBadge } from '../UI/ProjectUI/Badges/DateBadge'

// * We would have to map the items to fit as the Entity interface
export interface Entity {
  name: string
  parentName?: string // ? We sometimes dont want to show the parent name for the parent entity
  id: number
  creator: Employee
  employees: Employee[]
  priority?: number // ? Not all entities have a priority
  created: string
}

// * Pass the style to the EntityRenderer
export interface Style {
  width: string
  maxWidth: string
}

interface EntityRendererProps {
  entity: Entity
  showParentEntity: boolean
  entityBasePath: string
  parentBasePath?: string
  width: string
  maxWidth: string
}

const EntityRenderer: React.FC<EntityRendererProps> = (
  props
) => {
  const style: Style = {
    width: props.width,
    maxWidth: props.maxWidth
  }

  const priority = setEntityPriority(props.entity.priority ?? 0)

  return (
    <>
      <div className='flex items-center justify-center gap-2 p-4' style={style}>
        <Link
          className='font-bold text-theming-dark100 dark:text-theming-white100 text-center'
          href={`/${props.entityBasePath}/${props.entity.id}`}
        >
          {props.entity.name}
        </Link>
      </div>
      <EntityCreator style={style} creator={props.entity.creator} />
      {props.entity.employees.length > 0
        ? (
        <EntityEmployees style={style} employees={props.entity.employees} />
          )
        : (
        <div className='flex items-center justify-center gap-2' style={style}>
          No employees
        </div>
          )}
      {props.entity.priority !== null &&
        props.entity.priority !== undefined && (
          <div className='flex items-center justify-center gap-2' style={style}>
            <p style={{ color: priority.color }}>{priority.priorityText}</p>
          </div>
      )}
      <div className='flex items-center justify-center gap-2' style={style}>
        <DateBadge date={props.entity.created} showCustomColor={true} text='' textSize='text-sm' />
      </div>
      {props.showParentEntity && (
        <div className='flex items-center justify-center gap-2' style={style}>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100'
            href={`/${props.parentBasePath}/${props.entity.parentName}/${props.entity.id}/${props.entity.name}`}
          >
            {props.entity.parentName}
          </Link>
        </div>
      )}
    </>
  )
}

export default EntityRenderer
