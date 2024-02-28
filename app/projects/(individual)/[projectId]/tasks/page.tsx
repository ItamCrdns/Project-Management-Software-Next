import ProjectUI from './ProjectUI'
import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'
import getProjectLimited from '@/api-calls/getProjectLimited'
import getProjectTasks from '@/api-calls/getProjectTasks'
import generateQueryParams from '@/app/projects/client/queryParams'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = async (props) => {
  const projectId = props.params.projectId

  const { data } = await getProjectLimited(projectId)

  const queryParams = generateQueryParams(props.searchParams)

  const { data: tasks, status } = await getProjectTasks(projectId, queryParams)

  return (
    <section className='flex justify-center py-8 px-0'>
      <div>
        {status === 200 && (
          <div className='flex justify-end'>
            <DataHeader
              dashboard={false}
              width='300px'
              sortValues={taskSortValues}
              pushSearchParams
            />
          </div>
        )}
        <div className='flex items-start gap-8'>
          {data !== undefined && <ProjectUI project={data} showButtons />}
          {status === 200 && <TasksUI data={tasks} />}
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
