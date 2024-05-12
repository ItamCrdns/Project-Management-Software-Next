import { type Project } from '@/interfaces/project'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '../../queryParams'
import EachProject from '@/app/projects/(list)/EachProject'
import getFinishedProjectsByClient from '@/api-calls/getFinishedProjectsByClient'

const Projects: React.FC<{
  params: {
    client: string[]
  }
  searchParams: SearchParamsPageSize
}> = async (props) => {
  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getFinishedProjectsByClient(
    props.params.client[0],
    queryParams
  )

  const projects = data?.data ?? []

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <p className='text-lg'>No finished projects</p>
      </div>
    )
  }

  return (
    <ul className='space-y-4'>
      {projects.length > 0 &&
        projects.map((project: Project, index: number) => (
          <li
            className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
            key={index}
          >
            <EachProject project={project} showCompanyName={false} />
          </li>
        ))}
    </ul>
  )
}

export default Projects
