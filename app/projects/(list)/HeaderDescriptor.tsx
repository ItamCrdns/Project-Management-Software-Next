import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'

const HeaderDescriptor: React.FunctionComponent<HeaderDescriptorProps> = (
  props
) => {
  const style: Style = {
    width: props.width
  }

  return (
    <header className={styles.descriptor}>
      <span style={style}>
        <span className="material-symbols-outlined">signature</span>
        Name
      </span>
      <span style={style}>
        <span className="material-symbols-outlined">person</span>
        Creator
      </span>
      <span style={style}>
        <span className="material-symbols-outlined">group</span>
        Team
      </span>
      {props.isProject !== undefined && (
        <span style={style}>
          <span className="material-symbols-outlined">priority_high</span>
          Priority
        </span>
      )}
      <span style={style}>
        <span className="material-symbols-outlined">calendar_month</span>
        Created
      </span>
      {props.dashboard && props.isProject !== undefined && (
        <span style={style}>
          <span className="material-symbols-outlined">store</span>
          Company
        </span>
      )}
      {props.dashboard && props.isTask !== undefined && (
        <span style={style}>
          <span className="material-symbols-outlined">emoji_objects</span>
          Project
        </span>
      )}
      {props.dashboard && props.isIssue !== undefined && (
        <span style={style}>
          <span className="material-symbols-outlined">note_stack</span>
          Task
        </span>
      )}
    </header>
  )
}

export default HeaderDescriptor
