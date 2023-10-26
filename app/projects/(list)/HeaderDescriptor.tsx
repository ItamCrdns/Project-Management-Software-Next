import styles from './projectslist.module.css'

interface HeaderDescriptorProps {
  dashboard: boolean
}

const HeaderDescriptor: React.FunctionComponent<HeaderDescriptorProps> = ({
  dashboard
}) => {
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
        <span className="material-symbols-outlined">priority_high</span>
        Priority
      </span>
      <span>
        <span className="material-symbols-outlined">calendar_month</span>
        Created
      </span>
      {dashboard && (
        <span>
          <span className="material-symbols-outlined">store</span>
          Company
        </span>
      )}
    </header>
  )
}

export default HeaderDescriptor
