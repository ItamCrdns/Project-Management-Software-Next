import getUserProjectsShowcase from '@/api-calls/getUserProjectsShowcase'
import { Project as ProjectIcon } from '@/svg/Project'
import Link from 'next/link'

const ProjectsCard: React.FC<{
  username: string
}> = async (props) => {
  const { username } = props

  const { data } = await getUserProjectsShowcase(username, '1', '6')

  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md p-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-center'>
        <ProjectIcon />
        <h1 className='text-2xl m-0'>Projects</h1>
      </div>
      {Array.isArray(projects) && projects.length > 0 ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4'>
            {projects?.map((project) => (
              <li
                key={project.projectId}
                className='p-2 bg-theming-white200 dark:bg-theming-dark200 rounded-md text-center'
              >
                <Link
                  className='font-bold text-theming-dark100 dark:text-theming-white100 px-4'
                  href={`/clients/${project.clientId}/projects/${project.projectId}`}
                >
                  {project.name.slice(0, 24)}...
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className='font-semibold text-theming-dark100 dark:text-theming-white100'
            href={`/employee/${username}/projects`}
          >
            See all {projectsCount} projects
          </Link>
        </>
      ) : (
        <p>This employee has no assigned projects</p>
      )}
    </section>
  )
}

export default ProjectsCard
