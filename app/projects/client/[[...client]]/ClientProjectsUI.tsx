import styles from '@/app/projects/(list)/projectslist.module.css'
import TitleWrapper from '@/components/Header title/TitleWrapper'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import EachProject from '../../(list)/EachProject'
import { type Project } from '@/interfaces/project'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '../../../../components/Data Header/DataHeader'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'

interface ClientProjectsUIProps {
  title: string
  searchParams: SearchParamsPageSize
  totalPages: number
  totalProjects: number
  projects: Project[]
}

const ClientProjectsUI: React.FC<ClientProjectsUIProps> = (props) => {
  const { totalPages, totalProjects } = props

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Projects',
    totalEntitesCount: totalProjects
  }

  return (
    <main className={styles.main}>
      <TitleWrapper
        title={props.title}
        icon='emoji_objects'
        showButton={false}
        isPage
        showPictures // ? Options with pictures for the employees
      />
      <section className={styles.projectswrapper}>
        <DataHeader
          dashboard={false}
          pushSearchParams
          entity='projectsfromcompany'
          width='300px'
          sortValues={projectSortValues}
        />
        <div className={styles.projectscontainer}>
          <QueryParamsPagination paginationProps={paginationProps} />
          {Array.isArray(props.projects) && props.projects.length > 0
            ? (
            <ul>
              {props.projects.map((project: Project, index: number) => (
                <li key={index}>
                  <EachProject project={project} showCompanyName={false} />
                </li>
              ))}
            </ul>
              )
            : (
            <p style={{ textAlign: 'center' }}>
              No projects match your filtering criteria. Clear your filters and
              try again.
            </p>
              )}
        </div>
      </section>
    </main>
  )
}

export default ClientProjectsUI
