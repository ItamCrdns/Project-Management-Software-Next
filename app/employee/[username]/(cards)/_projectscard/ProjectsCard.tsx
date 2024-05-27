import getUserProjectsShowcase from '@/api-calls/getUserProjectsShowcase'
import Link from 'next/link'

const ProjectsCard: React.FC<{
  username: string
}> = async (props) => {
  const { username } = props

  const { data } = await getUserProjectsShowcase(username, '1', '6')

  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className='flex items-center flex-col gap-4 shadow-md p-8 rounded-md bg-theming-white100 dark:bg-theming-dark300'>
      <h1 className='font-semibold self-start'>Projects</h1>
      {Array.isArray(projects) && projects.length > 0 ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4'>
            {projects?.map((project) => (
              <li
                key={project.projectId}
                className='p-2 bg-theming-white200 dark:bg-theming-dark200 rounded-md text-center'
              >
                <Link
                  className='text-sm px-4'
                  href={`/clients/${project.clientId}/projects/${project.projectId}`}
                >
                  {project.name.slice(0, 24)}...
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className='font-semibold text-sm'
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
