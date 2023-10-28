// import styles from './dashboard.module.css'
import getEmployeeTier from '@/api-calls/getEmployeeTier'

interface DashboardPageProps {
  // projects: React.ReactNode
  // user: React.ReactNode
  // tasks: React.ReactNode
  // issues: React.ReactNode
  // employees: React.ReactNode
  admin: React.ReactNode
  employee: React.ReactNode
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = async (
  props
) => {
  const { data } = await getEmployeeTier()

  const tier = data?.name.toLowerCase()

  if (tier === 'supervisor') {
    return <>{props.admin}</>
  } else if (tier === 'employee') {
    return <>{props.employee}</>
  }
  // return <>{tier === 'supervisor' ? props.admin : props.employee}</>

  // return (
  //   <section className={styles.dashboard}>
  //     {props.user}
  //     {props.projects}
  //     <section className={styles.menus}>
  //       {props.tasks}
  //       {props.issues}
  //     </section>
  //   </section>
  // )
}

export default DashboardPage
