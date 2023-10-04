import getEmployee from '../../../api-calls/getEmployee'
import EmployeeCard from './EmployeeCard'
import SupervisorCard from './SupervisorCard'
import CurrentProjects from './CurrentProjects'
import RecentActivity from './RecentActivity'
import Colleagues from './Colleagues'
import Tasks from './Tasks'
import styles from './employee.module.css'

const IndividualEmployee = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const username = params.username
  const data = await getEmployee(username)
  const employee = data?.data

  return (
    <main className={styles.main}>
      <section className={styles.cardswrapper}>
        <EmployeeCard employee={employee} />
        <SupervisorCard employee={employee} />
      </section>
      <section className={styles.contentwrapper}>
        <RecentActivity employee={employee} />
        <CurrentProjects />
        <Tasks />
      </section>
      <section className={styles.rightsidewrapper}>
        <Colleagues />
      </section>
    </main>
  )
}

export default IndividualEmployee
