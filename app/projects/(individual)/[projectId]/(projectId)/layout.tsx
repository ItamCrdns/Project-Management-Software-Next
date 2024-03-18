import getProject from '@/api-calls/getProject'
import { DatesBanner } from './DatesBanner'
import { ClientBanner } from './ClientBanner'
import { DescriptionBanner } from './DescriptionBanner'
import ProjectUI from '@/components/ProjectUI/ProjectUI'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = async (props) => {
  const { children, tasks, params } = props

  const { data } = await getProject(params.projectId)

  const hasTasks = data?.entity.tasksCount ?? 0

  return (
    <section className='flex items-center flex-col p-8'>
      {children}
      <div className='flex flex-col items-start justify-center gap-8'>
        <div className='flex gap-8 items-start w-full justify-center'>
          {data !== undefined && (
            <ProjectUI
              project={data}
              showButtons={false}
              employeeCountHref={`/projects/${data?.entity.projectId}/employees`}
              showGeneralInfo={true}
            />
          )}
          <div className='space-y-8'>
            <ClientBanner name={data?.entity.company.name} />
            <DatesBanner
              created={data?.entity.created}
              expectedDelivery={data?.entity.expectedDeliveryDate}
              finalized={data?.entity.finished}
            />
          </div>
          <DescriptionBanner description={data?.entity.description} />
        </div>
        {hasTasks > 0 && tasks}
      </div>
    </section>
  )
}

export default ProjectId
