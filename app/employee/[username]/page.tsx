import { Suspense } from 'react'
import LoadingProjects from './(cards)/_projectscard/loading'
import ProjectsCard from './(cards)/_projectscard/ProjectsCard'
import LoadingEmployeeCard from './(cards)/_employeecard/loading'
import EmployeeIdCard from './(cards)/_employeecard/EmployeeCard'
import IssuesCard from './(cards)/_issuescard/IssuesCard'
import LoadingIssues from './(cards)/_issuescard/loading'
import TasksCard from './(cards)/_taskscard/TasksCard'
import LoadingTasks from './(cards)/_taskscard/loading'
import CoworkersCard from './(cards)/_coworkerscard/CoworkersCard'
import LoadingCoworkers from './(cards)/_coworkerscard/loading'

const EmployeeLayout: React.FC<{ params: { username: string } }> = (props) => {
  const { username } = props.params

  return (
    <section className='flex justify-center p-8 gap-8'>
      <Suspense fallback={<LoadingEmployeeCard />}>
        <EmployeeIdCard username={username} />
      </Suspense>
      <div className='space-y-8'>
        <Suspense fallback={<LoadingProjects />}>
          <ProjectsCard username={username} />
        </Suspense>
        <Suspense fallback={<LoadingTasks />}>
          <TasksCard username={username} />
        </Suspense>
        <Suspense fallback={<LoadingIssues />}>
          <IssuesCard username={username} />
        </Suspense>
      </div>
      <div className='space-y-8'>
        <Suspense fallback={<LoadingCoworkers />}>
          <CoworkersCard username={username} />
        </Suspense>
      </div>
    </section>
  )
}

export default EmployeeLayout
