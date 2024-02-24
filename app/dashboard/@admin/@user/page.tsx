import EmployeeBanner from '../../EmployeeBanner'
import AdminBanners from './AdminBanners'
import Loading from '../../Loading'
import { getMyEmployee } from '@/api-calls/getMyEmployee'

const UserPage = async (): Promise<JSX.Element> => {
  const { data } = await getMyEmployee()

  return (
    <section className='flex justify-center gap-4 h-24
    '>
      {data !== null
        ? (
        <>
          <EmployeeBanner employee={data} />
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
