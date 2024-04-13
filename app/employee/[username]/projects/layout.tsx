import DataHeader from '@/components/Data Header/DataHeader'
import { projectSortValues } from '@/components/Data Header/sortValues'
import { ArrowLeftCircle } from '@/svg/ArrowLeftCircle'
import Link from 'next/link'
import { EmployeeCardAndFilters } from './_employeecard-and-filters/EmployeeCardAndFilters'

const EmployeeCardAndProjects: React.FC<{
  params: { username: string }
  projects: React.ReactNode
}> = (props) => {
  const { username } = props.params

  return (
    <section className='flex justify-center gap-4'>
      <div>
        <div className='flex items-center justify-between gap-8 my-8 mx-0'>
          <Link
            className='flex gap-2 font-semibold text-theming-dark100 dark:text-theming-white100 cursor-pointer'
            href={`/employee/${username}`}
          >
            <ArrowLeftCircle />
            Return to {username}&apos;s profile
          </Link>
          <h1 className='font-semibold'>All {username}&apos;s projects</h1>
        </div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            pushSearchParams
            entity='projects'
            width='300px'
            sortValues={projectSortValues}
          />
        </div>
        <section className='flex items-start justify-center gap-8'>
          <EmployeeCardAndFilters username={username} />
          <div className='flex flex-col gap-8'>{props.projects}</div>
        </section>
      </div>
    </section>
  )
}

export default EmployeeCardAndProjects
