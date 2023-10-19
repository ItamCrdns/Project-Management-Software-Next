import styles from '../employee.module.css'
import getUserProjects from '@/api-calls/getUserProjects'
import ProjectList from '../projects/ProjectList'

interface Props {
  params: { username: string }
  searchParams: { page: string }
}

const EmployeeProjectsIntercepted: React.FunctionComponent<Props> = async ({
  params,
  searchParams
}) => {
  const { username } = params
  const { page } = searchParams ?? '1'
  const { data } = await getUserProjects(username, page, '5')

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0

  return (
    <section className={styles.projectsinterceptionwrapper}>
      <section className={styles.projects}>
        <ProjectList projects={projects} username={username} totalPages={totalPages} />
      </section>
    </section>
  )
}

export default EmployeeProjectsIntercepted
