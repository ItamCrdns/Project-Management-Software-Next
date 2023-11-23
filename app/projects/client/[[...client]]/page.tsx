import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type Project } from '@/interfaces/project'
import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '../queryParams'
import ClientProjectsUI from './ClientProjectsUI'

const CompanyProjectsPage: React.FC<ClientNameProps> = async (props) => {
  const clientId = props.params.client[0]

  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getCompanyProjects(clientId, queryParams)

  const projects = (data?.data as Project[]) ?? []
  const totalPages = data?.pages ?? 0
  const totalProjects = data?.count ?? 0

  if (parseInt(props.searchParams.page) > totalPages) {
    props.searchParams.page = totalPages.toString()
  }

  if (parseInt(props.searchParams.pagesize) > totalProjects) {
    props.searchParams.pagesize = totalProjects.toString()
  }

  // * Access the company name from one of the projects (its fine they all have the same company name)
  const companyName = projects[0].company.name.split('.').join('') // ? Remove dots from company name ("Inc.")
  const clientName = projects.length > 0 && companyName

  const title = `${clientName} projects`

  const urlForQueryParams = `/projects/client/${clientId}/${clientName}`

  const baseUrl = `/projects/client/${clientId}/${clientName}/`

  return (
    <ClientProjectsUI
      title={title}
      urlForQueryParams={urlForQueryParams}
      baseUrl={baseUrl}
      searchParams={props.searchParams}
      totalPages={totalPages}
      totalProjects={totalProjects}
      projects={projects}
    />
  )
}

export default CompanyProjectsPage
