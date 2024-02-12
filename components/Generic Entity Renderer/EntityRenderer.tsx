import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import EntityCreator from './EntityCreator'
import EntityEmployees from './EntityEmployees'
import { setEntityPriority } from './EntityPriority'
import styles from '@/app/projects/(list)/projectslist.module.css'
import { getRelativeTimeString } from '@/utility/relativeTime'

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

const EntityRenderer: React.FunctionComponent<EntityRendererProps> = (
  props
) => {
  const style: Style = {
    width: props.width,
    maxWidth: props.maxWidth
  }

  const priority = setEntityPriority(props.entity.priority ?? 0)

  return (
    <>
      <div style={style}>
        <h1>
          <Link href={`/${props.entityBasePath}/${props.entity.id}`}>
            {props.entity.name}
          </Link>
        </h1>
      </div>
      <EntityCreator style={style} creator={props.entity.creator} />
      {props.entity.employees.length > 0
        ? (
        <EntityEmployees style={style} employees={props.entity.employees} />
          )
        : (
        <div style={style} className={styles.listofemployees}>
          No employees
        </div>
          )}
      {props.entity.priority !== null &&
        props.entity.priority !== undefined && (
          <div style={style}>
            <p style={{ color: priority.color }}>{priority.priorityText}</p>
          </div>
      )}
      <div style={style}>
        <p>{getRelativeTimeString(props.entity.created)}</p>
      </div>
      {props.showParentEntity && (
        <div style={style}>
          <h1 style={{ textAlign: 'center' }}>
            <Link
              href={`/${props.parentBasePath}/${props.entity.parentName}/${props.entity.id}/${props.entity.name}`}
            >
              {props.entity.parentName}
            </Link>
          </h1>
        </div>
      )}
    </>
  )
}

export default EntityRenderer
