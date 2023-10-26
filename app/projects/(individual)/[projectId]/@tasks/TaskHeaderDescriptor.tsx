import styles from '@/app/projects/(list)/projectslist.module.css'

interface TaskHeaderDescriptorProps {
  dashboard: boolean
}

const TaskHeaderDescriptor: React.FunctionComponent<
TaskHeaderDescriptorProps
> = ({ dashboard }) => {
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
        Employees
      </span>
      <span>
        <span className="material-symbols-outlined">calendar_month</span>
        Created
      </span>
      {dashboard && (
        <span>
          <span className="material-symbols-outlined">emoji_objects</span>
          Project
        </span>
      )}
    </header>
  )
}

export default TaskHeaderDescriptor
