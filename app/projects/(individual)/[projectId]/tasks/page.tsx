import ProjectUI from './ProjectUI'
import TasksUI from './TasksUI'
import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import DataHeader from '@/components/Data Header/DataHeader'

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  return (
    <section className='flex justify-center gap-4 py-6 px-0'>
      <div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            width='300px'
            sortValues={taskSortValues}
            pushSearchParams
          />
        </div>
        <div className='flex items-start gap-4'>
          <ProjectUI projectId={props.params.projectId} />
          <TasksUI
            projectId={props.params.projectId}
            searchParams={props.searchParams}
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
