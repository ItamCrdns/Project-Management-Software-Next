import styles from './employee.module.css'
import { type EmployeeIdProps } from '@/interfaces/props/EmployeeIdProps'

const EmployeeIdLayout: React.FC<EmployeeIdProps> = async (props) => {
  return (
    <>
      {props.children}
      <main className={styles.main}>
        {props.employeeCard}
        <section className={styles.contentwrapper}>
          {props.projects}
          {props.tasks}
          {props.issues}
        </section>
        <section className={styles.rightsidewrapper}>
          {props.colleagues}
        </section>
      </main>
    </>
  )
}

export default EmployeeIdLayout
