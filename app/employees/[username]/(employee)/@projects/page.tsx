import { type Project } from '@/interfaces/project'
import getUserProjectsShowcase from '@/api-calls/getUserProjectsShowcase'
import Link from 'next/link'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const CurrentProjects: React.FC<UsernameParamsProps> = async (props) => {
  const { username } = props.params
  const { data } = await getUserProjectsShowcase(username, '1', '5')
  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md px-8 py-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
          />
        </svg>
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
            href={`/employees/${username}/projects?page=1`}
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

export default CurrentProjects
