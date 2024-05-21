import getEmployeeTier from '@/api-calls/getEmployeeTier'
import Tabs from '@/components/Tabs/Tabs'
import { adminTabs } from './adminTabs'

interface DashboardPageProps {
  admin: React.ReactNode
  employee: React.ReactNode
}

const DashboardPage: React.FC<DashboardPageProps> = async (props) => {
  const { data } = await getEmployeeTier()

  const tier = data?.name.toLowerCase()

  if (tier === 'supervisor') {
    return (
      <div className='flex flex-col justify-center items-center'>
        <div className='flex self-center mt-8 bg-theming-white100 dark:bg-theming-dark300 rounded-md shadow-md px-4'>
          <Tabs options={adminTabs} />
        </div>
        {props.admin}
      </div>
    )
  } else if (tier === 'employee') {
    return <>{props.employee}</>
  }
}

export default DashboardPage
