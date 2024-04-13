import { Suspense } from 'react'
import LoadingEmployeeCard from '../../(cards)/_employeecard/loading'
import EmployeeIdCard from '../../(cards)/_employeecard/EmployeeCard'
import { Filters } from './Filters'

const EmployeeCardAndFilters: React.FC<{ username: string }> = (props) => {
  const { username } = props

  return (
    <div className='flex flex-col gap-8 items-stretch justify-center'>
      <Suspense fallback={<LoadingEmployeeCard />}>
        <EmployeeIdCard username={username} />
      </Suspense>
      <Filters />
    </div>
  )
}

export { EmployeeCardAndFilters }
