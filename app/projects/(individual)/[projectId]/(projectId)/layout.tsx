import getProject from '@/api-calls/getProject'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { Client } from './Banners/Client'
import { Description } from './Banners/Description'
import { Attachments } from './Banners/Attachments'

interface ProjectIdProps {
  children: React.ReactNode
  tasks: React.ReactNode
  params: { projectId: string }
}

const ProjectId: React.FC<ProjectIdProps> = async (props) => {
  const { children, tasks, params } = props

  const { data: project, status } = await getProject(params.projectId)

  const hasTasks = project?.entity.tasksCount ?? 0

  return (
    <section className='flex items-center flex-col'>
      {children}
      <div className='flex flex-col items-start justify-center gap-8 p-8'>
        <div className='flex gap-8 items-start w-full justify-center'>
          {status === 200
            ? (
            <>
              <ProjectUI
                project={project}
                showButtons={false}
                employeeCountHref={`/projects/${project?.entity.projectId}/employees`}
                showGeneralInfo={true}
              />
              <div className='space-y-8'>
                <Client name={project?.entity.company.name} />
                <Description description={project?.entity.description} />
              </div>
              <div className='space-y-8'>
                <Attachments />
              </div>
            </>
              )
            : (
            <h1>Project not found</h1>
              )}
        </div>
        {hasTasks > 0 && tasks}
      </div>
    </section>
  )
}

export default ProjectId
