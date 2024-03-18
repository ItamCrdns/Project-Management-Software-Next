import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'
import getProjectLimited from '@/api-calls/getProjectLimited'
import getProjectTasks from '@/api-calls/getProjectTasks'
import generateQueryParams from '@/app/projects/client/queryParams'
import { NoTasks } from './NoTasks'
import ProjectUI from '@/components/ProjectUI/ProjectUI'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = async (props) => {
  const projectId = props.params.projectId

  const { data } = await getProjectLimited(projectId)

  const queryParams = generateQueryParams(props.searchParams)

  const { data: tasks } = await getProjectTasks(projectId, queryParams)

  const noTasks = tasks?.entity.count === 0

  return (
    <section className='flex justify-center py-8 px-0'>
      <div>
        {!noTasks && (
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
          {!noTasks
            ? (
            <TasksUI data={tasks} />
              )
            : (
            <NoTasks
              isOwner={tasks.isProjectOwner}
              projectId={Number(projectId)}
            />
              )}
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
