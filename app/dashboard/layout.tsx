import getEmployeeTier from '@/api-calls/getEmployeeTier'

interface DashboardPageProps {
  admin: React.ReactNode
  employee: React.ReactNode
  user: React.ReactNode
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = async (
  props
) => {
  const { data } = await getEmployeeTier()

  const tier = data?.name.toLowerCase()

  if (tier === 'supervisor') {
    return (
      <>
        {/* <section className={styles.dashboard}>{props.user}</section> */}
        {props.admin}
      </>
    )
  } else if (tier === 'employee') {
    return (
      <>
        {props.employee}
      </>
    )
  }
}

export default DashboardPage
