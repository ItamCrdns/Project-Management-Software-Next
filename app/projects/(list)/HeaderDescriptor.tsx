import styles from './projectslist.module.css'

interface HeaderDescriptorProps {
  dashboard: boolean
  isProject?: boolean
  isTask?: boolean
  isIssue?: boolean
}

const HeaderDescriptor: React.FunctionComponent<HeaderDescriptorProps> = (
  props
) => {
  return (
    <header className={styles.descriptor}>
      <span>
        <span className="material-symbols-outlined">signature</span>
        Name
      </span>
      <span>
        <span className="material-symbols-outlined">person</span>
        Creator
      </span>
      <span>
        <span className="material-symbols-outlined">group</span>
        Team
      </span>
      {props.isProject !== undefined && (
        <span>
          <span className="material-symbols-outlined">priority_high</span>
          Priority
        </span>
      )}
      <span>
        <span className="material-symbols-outlined">calendar_month</span>
        Created
      </span>
      {props.dashboard && props.isProject !== undefined && (
        <span>
          <span className="material-symbols-outlined">store</span>
          Company
        </span>
      )}
      {props.dashboard && props.isTask !== undefined && (
        <span>
          <span className="material-symbols-outlined">emoji_objects</span>
          Project
        </span>
      )}
      {props.dashboard && props.isIssue !== undefined && (
        <span>
          <span className="material-symbols-outlined">note_stack</span>
          Task
        </span>
      )}
    </header>
  )
}

export default HeaderDescriptor
