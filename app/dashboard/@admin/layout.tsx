import FilterProvider from '@/context/Filter/FilterContext'

interface AdminDashboardProps {
  projects: React.ReactNode
  tasks: React.ReactNode
  issues: React.ReactNode
  employees: React.ReactNode
  user: React.ReactNode
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  return (
    <FilterProvider>
      <section className='flex flex-col items-center p-8'>
        {props.user}
        {props.projects}
        <section className='grid grid-cols-2 gap-4'>
          {props.tasks}
          {props.issues}
        </section>
      </section>
    </FilterProvider>
  )
}

export default AdminDashboard
