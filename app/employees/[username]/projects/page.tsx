import getUserProjects from '@/api-calls/getUserProjects'
import { type EmployeeProjectsProps } from '@/interfaces/props/EmployeeProjectsProps'
import ProjectUI from './ProjectUI'
import generateQueryParams from '@/app/projects/client/queryParams'

const EmployeeProjects: React.FC<EmployeeProjectsProps> = async (props) => {
  const { data } = await getUserProjects(
    props.params.username,
    generateQueryParams(props.searchParams)
  )

  return (
    <ProjectUI
      username={props.params.username}
      projects={data?.data ?? []}
      totalPages={data?.pages ?? 0}
      totalProjects={data?.count ?? 0}
    />
  )
}

export default EmployeeProjects
