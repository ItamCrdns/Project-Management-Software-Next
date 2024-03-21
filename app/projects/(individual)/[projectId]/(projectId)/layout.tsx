import getProject from '@/api-calls/getProject'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { Client } from './Banners/Client'
import { Dates } from './Banners/Dates'
import { Description } from './Banners/Description'
import { Attachments } from './Banners/Attachments'

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
    <section className='flex items-center flex-col'>
      {children}
      <div className='flex flex-col items-start justify-center gap-8 p-8'>
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
            <Client name={data?.entity.company.name} />
            <Dates
              created={data?.entity.created}
              expectedDelivery={data?.entity.expectedDeliveryDate}
              finalized={data?.entity.finished}
            />
          </div>
          <div className='space-y-8'>
            <Description description={data?.entity.description} />
            <Attachments />
          </div>
        </div>
        {hasTasks > 0 && tasks}
      </div>
    </section>
  )
}

export default ProjectId
