import getOngoingProjectsByClient from '@/api-calls/getOngoingProjectsByClient'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '../../queryParams'
import EachProject from '@/app/projects/(list)/EachProject'

const OngoingProjects: React.FC<{
  clientId: string
  searchParams: SearchParamsPageSize
}> = async (props) => {
  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getOngoingProjectsByClient(props.clientId, queryParams)

  const projects = data?.data ?? []

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <p className='text-lg'>No ongoing projects</p>
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
            <EachProject
              project={project}
              showCompanyName={false}
              entityIdentifer='ongoingProjects'
            />
          </li>
        ))}
    </ul>
  )
}

export default OngoingProjects
