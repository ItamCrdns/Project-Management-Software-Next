import { type Employee } from '@/interfaces/employee'
import Link from 'next/link'
import { relativeTime } from '@/utility/relativeTime'
import EntityCreator from './EntityCreator'
import EntityEmployees from './EntityEmployees'
import EntityPriority from './EntityPriority'
import styles from '@/app/projects/(list)/projectslist.module.css'

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
        <div style={style} className={styles.listofemployees}>No employees</div>
          )}
      {props.entity.priority !== null &&
        props.entity.priority !== undefined && (
          <EntityPriority style={style} priority={props.entity.priority} />
      )}
      <div style={style}>
        <p>{relativeTime(new Date(props.entity.created).getTime())}</p>
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
