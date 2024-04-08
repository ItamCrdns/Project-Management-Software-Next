import { taskSortValues } from '@/app/dashboard/@admin/@tasks/sortValues'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { Project } from './Project'
import DataHeader from '@/components/Data Header/DataHeader'
import { Tasks } from './Tasks'
import { Suspense } from 'react'
import { Loading } from '@/app/projects/client/[[...client]]/Loading' //* Theyre pretty similar

interface ProjectTasksProps {
  params: { projectId: string }
  searchParams: SearchParamsPageSize
}

const ProjectTasks: React.FC<ProjectTasksProps> = (props) => {
  const projectId = props.params.projectId

  const key =
    props.searchParams.pagesize +
    props.searchParams.page +
    props.searchParams.orderby +
    props.searchParams.sort +
    props.searchParams.author +
    props.searchParams.priority +
    props.searchParams.secondpagesize +
    props.searchParams.searchValue

  return (
    <section className='flex justify-center py-8 px-0'>
      <div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            width='300px'
            sortValues={taskSortValues}
            pushSearchParams
          />
        </div>
        <div className='flex items-start gap-8'>
          <Project projectId={projectId} />
          <Suspense
            key={key}
            fallback={
              <Loading
                skeletonCount={Number(props.searchParams.pagesize)}
                width={1200}
              />
            }
          >
            <Tasks projectId={projectId} searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProjectTasks
