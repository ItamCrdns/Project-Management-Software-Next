import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '../queryParams'
import DataHeader from '@/components/Data Header/DataHeader'
import { projectSortValues } from '@/components/Data Header/sortValues'
import { ProjectsUI } from './ProjectsUI'
import { getCompany } from '@/api-calls/getCompanyById'
import { CompanyUI } from './CompanyUI'

const CompanyProjectsPage: React.FC<ClientNameProps> = async (props) => {
  const clientId = props.params.client[0]

  const { data } = await getCompany(clientId)

  const queryParams = generateQueryParams(props.searchParams)

  const { data: projects } = await getCompanyProjects(clientId, queryParams)

  const totalPages = projects?.pages ?? 0
  const totalProjects = projects?.count ?? 0

  if (Number(props.searchParams.page) > totalPages) {
    props.searchParams.page = totalPages.toString()
  }

  if (Number(props.searchParams.pagesize) > totalProjects) {
    props.searchParams.pagesize = totalProjects.toString()
  }

  const noProjects = projects?.count === 0

  return (
    <main className='flex items-center flex-col p-8'>
      <div>
        {/* {!noProjects && ( */}
        <div className='flex justify-end'>
          <DataHeader
            dashboard={false}
            pushSearchParams
            entity='projectsfromcompany'
            width='300px'
            sortValues={projectSortValues}
          />
        </div>
        {/* )} */}
        <div className='flex items-start gap-8'>
          {data !== undefined && <CompanyUI data={data} />}
          {/* <div className='bg-red-400 w-full'> */}
          {!noProjects
            ? (
            <ProjectsUI data={projects} />
              )
            : (
            <div className='w-full text-center'>
              No projects match your search criteria
            </div>
              )}
          {/* </div> */}
        </div>
      </div>
    </main>
  )
}

export default CompanyProjectsPage
