import getUserProjects from '@/api-calls/getUserProjects'
import { type EmployeeProjectsProps } from '@/interfaces/props/EmployeeProjectsProps'
import ProjectUI from './ProjectUI'
import generateQueryParams from '@/app/projects/client/queryParams'

const EmployeeProjects: React.FC<EmployeeProjectsProps> = async (props) => {
  const data = await getUserProjects(
    props.params.username,
    generateQueryParams(props.searchParams)
  )

  const projects = data.data?.data ?? []
  const totalPages = data.data?.pages ?? 0
  const totalProjects = data.data?.count ?? 0

  return (
    <ProjectUI
      username={props.params.username}
      projects={projects}
      totalPages={totalPages}
      totalProjects={totalProjects}
    />
  )
}

export default EmployeeProjects
