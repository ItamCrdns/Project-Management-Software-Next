import getEntitiesCreatedLastWeek from '@/api-calls/getEntitiesCreatedLastWeek'
import { getMyEmployee } from '@/api-calls/getMyEmployee'
import EmployeeBanner from './EmployeeBanner'
import AdminBanners from './AdminBanners'

const CurrentUserPage = async () => {
  const myEmployeeData = getMyEmployee()

  const lastWeekData = getEntitiesCreatedLastWeek()

  const [{ data: myEmployee }, { data: lastWeek }] = await Promise.all([
    myEmployeeData,
    lastWeekData
  ])

  return (
    <div className='flex justify-center gap-4 h-24'>
      {myEmployee && <EmployeeBanner data={myEmployee} />}
      {lastWeek && <AdminBanners data={lastWeek} />}
    </div>
  )
}

export default CurrentUserPage
