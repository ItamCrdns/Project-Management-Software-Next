import getUserProjects from '@/api-calls/getUserProjects'
import ProjectList from './ProjectList'
import styles from '../employee.module.css'

interface Props {
  params: { username: string }
  searchParams: { page: string }
}

const EmployeeProjects: React.FunctionComponent<Props> = async ({
  params,
  searchParams
}) => {
  const { username } = params
  let { page } = searchParams

  if (page === undefined || page === null) {
    // Set the value to 1 if the user removes the page?=# from the URL
    page = '1'
  }

  const { data } = await getUserProjects(username, page, '5')

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0

  return (
    <section className={styles.projectsinterceptionwrapper}>
      <section className={styles.projects}>
        <ProjectList
          projects={projects}
          username={username}
          totalPages={totalPages}
          pageFromSearchParams={page}
        />
      </section>
    </section>
  )
}

export default EmployeeProjects
