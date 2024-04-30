import { Suspense } from 'react'
import { MyTeam } from './MyTeam'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { LoadingTeamSkeleton } from './LoadingTeamSkeleton'
import { EmployeesDataHeader } from '@/components/Employees Data Header/EmployeesDataHeader'

const Employees: React.FC<{ searchParams: SearchParamsPageSize }> = (props) => {
  const key = new URLSearchParams(Object.entries(props.searchParams)).toString()

  return (
    <div className='p-8'>
      <EmployeesDataHeader />
      <Suspense
        key={key}
        fallback={
          <LoadingTeamSkeleton
            count={
              isNaN(Number(props.searchParams.pagesize))
                ? 5
                : Number(props.searchParams.pagesize)
            }
          />
        }
      >
        <MyTeam
          page={props.searchParams.page}
          pageSize={props.searchParams.pagesize}
        />
      </Suspense>
    </div>
  )
}

export default Employees
