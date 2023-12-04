import { type EntityHeaderProps } from '@/interfaces/props/EntityHeaderProps'
import styles from './admin.module.css'
import LoggedInCard from '@/components/Header title/LoggedInCard'

const EntityHeader: React.FC<EntityHeaderProps> = (props) => {
  return (
    <div className={styles.headerwrapper}>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 600,
          color: props.color ?? 'var(--text-color)'
        }}
      >
        LATEST {props.entityName.toUpperCase()}
      </h1>
      <LoggedInCard optionsText='Filters' entityName={props.entityName} isDashboard />
    </div>
  )
}

export default EntityHeader
