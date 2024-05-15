import DataHeader from '@/components/Data Header/DataHeader'
import { projectSortValues } from '@/components/Data Header/sortValues'
import { EmployeeCardAndFilters } from './_employeecard-and-filters/EmployeeCardAndFilters'

const EmployeeCardAndProjects: React.FC<{
  params: { username: string }
  projects: React.ReactNode
}> = (props) => {
  const { username } = props.params

  return (
    <section className='flex flex-col justify-center gap-4 p-8'>
      <div className='flex items-start justify-center gap-8'>
        <EmployeeCardAndFilters username={username} />
        <div className='space-y-8'>
          <DataHeader
            dashboard={false}
            pushSearchParams
            entity='projects'
            width='300px'
            sortValues={projectSortValues}
          />
          <div className='flex flex-col gap-8'>{props.projects}</div>
        </div>
      </div>
    </section>
  )
}

export default EmployeeCardAndProjects
