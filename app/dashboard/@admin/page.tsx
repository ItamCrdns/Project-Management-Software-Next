import FilterProvider from '@/context/Filter/FilterContext'
import UserPage from './_user/page'
import Projects from './_projects/page'
import Issues from './_issues/page'
import Tasks from './_tasks/page'

const AdminDashboard: React.FC = () => {
  return (
    <FilterProvider>
      <section className='flex flex-col items-center p-8'>
        <UserPage />
        <Projects />
        <Tasks />
        <Issues />
      </section>
    </FilterProvider>
  )
}

export default AdminDashboard
