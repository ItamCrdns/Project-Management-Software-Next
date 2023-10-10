import styles from './projectslist.module.css'

const HeaderDescriptor = (): JSX.Element => {
  return (
    <header className={styles.descriptor}>
      <span style={{ width: '300px', justifyContent: 'center' }}>
        <span className="material-symbols-outlined">signature</span>
        Name
      </span>
      <span style={{ width: '300px', justifyContent: 'center' }}>
        <span className="material-symbols-outlined">person</span>
        Creator
      </span>
      <span style={{ width: '300px', justifyContent: 'center' }}>
        <span className="material-symbols-outlined">group</span>
        Employees
      </span>
      <span style={{ width: '300px', justifyContent: 'center' }}>
        <span className="material-symbols-outlined">priority_high</span>
        Priority
      </span>
      <span style={{ width: '300px', justifyContent: 'center' }}>
        <span className="material-symbols-outlined">calendar_month</span>
        Created
      </span>
    </header>
  )
}

export default HeaderDescriptor
