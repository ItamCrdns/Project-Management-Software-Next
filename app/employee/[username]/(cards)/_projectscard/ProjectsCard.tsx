import getUserProjectsShowcase from '@/api-calls/getUserProjectsShowcase'
import { type Project } from '@/interfaces/project'
import { Project as ProjectIcon } from '@/svg/Project'
import Link from 'next/link'

const ProjectsCard: React.FC<{
  username: string
}> = async (props) => {
  const { username } = props

  const { data } = await getUserProjectsShowcase(username, '1', '5')

  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md px-8 py-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-4'>
        <ProjectIcon />
        <h1 className='text-2xl m-0'>Current projects</h1>
        <h3 className='m-0'>List</h3>
      </div>
      {Array.isArray(projects) && projects.length > 0
        ? (
        <>
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <Link
                  className='font-bold text-theming-dark100 dark:text-theming-white100'
                  href={`/projects/${project.projectId}`}
                >
                  {project.name}
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
          )
        : (
        <p>Here we will show their current projects.</p>
          )}
    </section>
  )
}

export default ProjectsCard
