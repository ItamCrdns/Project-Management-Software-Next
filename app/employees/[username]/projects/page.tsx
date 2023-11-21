import getUserProjects from '@/api-calls/getUserProjects'
import { type EmployeeProjectsProps } from '@/interfaces/props/EmployeeProjectsProps'
import ProjectUI from './ProjectUI'

const EmployeeProjects: React.FunctionComponent<EmployeeProjectsProps> = async (
  props
) => {
  const { params, searchParams } = props
  const { username } = params

  if (
    props.searchParams.page === undefined ||
    props.searchParams.page === null
  ) {
    // Set the value to 1 if the user removes the page?=# from the URL
    props.searchParams.page = '1'
  }

  if (
    props.searchParams.pagesize === undefined ||
    props.searchParams.pagesize === null
  ) {
    // Set the value to 10 if the user removes the pagesize?=# from the URL
    props.searchParams.pagesize = '10'
  }

  const { data } = await getUserProjects(
    username,
    props.searchParams.page,
    props.searchParams.pagesize
  )

  const projects = data?.data ?? []

  return (
    <ProjectUI
      username={username}
      projects={projects}
      totalPages={data?.pages ?? 0}
      totalProjects={data?.count ?? 0}
      searchParams={searchParams}
    />
  )
}

export default EmployeeProjects
