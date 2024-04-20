import getProject from '@/api-calls/getProject'
import { NotFound } from '@/components/404 Not Found/NotFound'
import ProjectUI from '@/components/UI/ProjectUI/ProjectUI'
import { Client } from './Banners/Client'
import { Description } from './Banners/Description'
import { Attachments } from './Banners/Attachments'

const Project: React.FC<{ projectId: string }> = async (props) => {
  const { data: project, status } = await getProject(props.projectId)

  if (status !== 200) {
    return (
      <NotFound
        text='Project not found'
        buttonText='Return to homepage'
        href='/'
      />
    )
  }

  return (
    <>
      <ProjectUI
        project={project}
        showButtons={true}
        employeeCountHref={`/projects/${project?.entity.projectId}/employees`}
        showGeneralInfo={true}
        noProject={status !== 200}
      />
      <div className='space-y-8 w-[300px]'>
        <Client name={project?.entity.company.name} />
        <Description description={project?.entity.description} />
      </div>
      <div className='space-y-8 w-[300px]'>
        <Attachments />
      </div>
    </>
  )
}

export { Project }
