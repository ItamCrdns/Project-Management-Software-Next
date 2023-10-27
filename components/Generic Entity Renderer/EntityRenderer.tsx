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

interface EntityRendererProps {
  entity: Entity
  showParentEntity: boolean
  entityBasePath: string
  parentBasePath?: string
}

const EntityRenderer: React.FunctionComponent<EntityRendererProps> = ({
  entity,
  showParentEntity,
  entityBasePath,
  parentBasePath
}) => {
  return (
    <>
      <div>
        <h1>
          <Link href={`/${entityBasePath}/${entity.id}`}>{entity.name}</Link>
        </h1>
      </div>
      <EntityCreator creator={entity.creator} />
      {entity.employees.length > 0
        ? (
        <EntityEmployees employees={entity.employees} />
          )
        : (
        <div className={styles.listofemployees}>No employees</div>
          )}
      {entity.priority !== null && entity.priority !== undefined && (
        <EntityPriority priority={entity.priority} />
      )}
      <div>
        <p>{relativeTime(new Date(entity.created).getTime())}</p>
      </div>
      {showParentEntity && (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            <Link
              href={`/${parentBasePath}/${entity.parentName}/${entity.id}/${entity.name}`}
            >
              {entity.parentName}
            </Link>
          </h1>
        </div>
      )}
    </>
  )
}

export default EntityRenderer
