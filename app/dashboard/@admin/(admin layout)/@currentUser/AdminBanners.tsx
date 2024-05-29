import { Issue } from '@/icons/Issue'
import { Project } from '@/icons/Project'
import { Task } from '@/icons/Task'
import { LatestWeek } from '@/interfaces/LatestWeek'

const AdminBanners: React.FC<{
  data: LatestWeek
}> = (props) => {
  const projectsLastWeek = props.data.projectsLastWeek
  const tasksLastWeek = props.data.tasksLastWeek
  const issuesLastWeek = props.data.issuesLastWeek

  return (
    <>
      <div className='flex items-center w-[200px] justify-between gap-4 p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New projects</h1>
          <p className='text-center m-0'>{projectsLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-400 p-4 rounded-full'>
          <Project />
        </span>
      </div>
      <div className='flex items-center w-[200px] justify-between gap-4 p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New tasks</h1>
          <p className='text-center m-0'>{tasksLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-400 p-4 rounded-full'>
          <Task />
        </span>
      </div>
      <div className='flex items-center w-[200px] justify-between gap-4 p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
        <div>
          <h1 className='font-semibold m-0'>New issues</h1>
          <p className='text-center m-0'>{issuesLastWeek} this week</p>
        </div>
        <span className='text-white bg-azure-radiance-400 p-4 rounded-full'>
          <Issue />
        </span>
      </div>
    </>
  )
}

export default AdminBanners
