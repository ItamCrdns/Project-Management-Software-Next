import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import getFinishedProjectsByClient from '@/api-calls/getFinishedProjectsByClient'
import EachProject from '@/app/projects/(list)/EachProject'
import generateQueryParams from '../../queryParams'

const NotStartedProjects = async ({
  clientId,
  searchParams
}: {
  clientId: string
  searchParams: SearchParamsPageSize
}) => {
  const queryParams = generateQueryParams(searchParams)

  const { data } = await getFinishedProjectsByClient(clientId, queryParams)

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
        projects.map((project) => (
          <li
            className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
            key={project.projectId}
          >
            <EachProject project={project} showCompanyName={false} />
          </li>
        ))}
    </ul>
  )
}

export default NotStartedProjects
