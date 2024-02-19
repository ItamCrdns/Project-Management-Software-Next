import { type Employee } from '@/interfaces/employee'
import EmployeeBanner from '../../EmployeeBanner'
import AdminBanners from './AdminBanners'
import Loading from '../../Loading'
import styles from '@/app/dashboard/dashboard.module.css'
import { getMyEmployee } from '@/api-calls/getMyEmployee'

const UserPage = async (): Promise<JSX.Element> => {
  const { data } = await getMyEmployee()

  const employee = data as Employee

  return (
    <section className={styles.welcomewrapper}>
      {employee !== null && employee !== undefined
        ? (
        <>
          <EmployeeBanner employee={employee} />
          <AdminBanners />
        </>
          )
        : (
        <Loading />
          )}
    </section>
  )
}

export default UserPage
