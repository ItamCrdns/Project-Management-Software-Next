import { type EmployeeIdProps } from '@/interfaces/props/EmployeeIdProps'
import { Suspense } from 'react'
import LoadingColleagues from './@colleaguesCard/loading'
import LoadingEmployeeCard from './@employeeCard/loading'
import LoadingIssues from './@issues/loading'
import LoadingProjects from './@projects/loading'
import LoadingTasks from './@tasks/loading'

const EmployeeIdLayout: React.FC<EmployeeIdProps> = async (props) => {
  return (
    <>
      {props.children}
      <main className='flex justify-center p-8 gap-8'>
        <Suspense fallback={<LoadingEmployeeCard />}>
          {props.employeeCard}
        </Suspense>
        <div className='flex flex-col gap-8'>
          <Suspense fallback={<LoadingProjects />}>{props.projects}</Suspense>
          <Suspense fallback={<LoadingTasks />}>{props.tasks}</Suspense>
          <Suspense fallback={<LoadingIssues />}>{props.issues}</Suspense>
        </div>
        <div className='flex flex-col gap-8'>
          <Suspense fallback={<LoadingColleagues />}>
            {props.colleaguesCard}
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default EmployeeIdLayout
