import styles from '@/app/projects/(list)/projectslist.module.css'
import TitleWrapper from '@/components/Header title/TitleWrapper'
import HeaderDescriptor from '../../(list)/HeaderDescriptor'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import EachProject from '../../(list)/EachProject'
import { type Project } from '@/interfaces/project'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { projectSortValues } from '@/app/dashboard/@admin/@projects/sortValues'

interface ClientProjectsUIProps {
  title: string
  urlForQueryParams: string
  baseUrl: string
  searchParams: SearchParamsPageSize
  totalPages: number
  totalProjects: number
  projects: Project[]
}

const ClientProjectsUI: React.FC<ClientProjectsUIProps> = (props) => {
  return (
    <main className={styles.main}>
      <TitleWrapper
        title={props.title}
        icon="emoji_objects"
        showButton={false}
        isDashboard={false}
        entityName='clientprojects'
      />
      <section className={styles.projectswrapper}>
        <HeaderDescriptor
          dashboard={false}
          entity="projects"
          width="300px"
          sortValues={projectSortValues}
          pushSearchParams
          url={props.baseUrl}
          searchParams={props.searchParams}
        />
        <div className={styles.projectscontainer}>
          <QueryParamsPagination
            url={props.urlForQueryParams}
            totalPages={props.totalPages}
            searchParams={props.searchParams}
            entityName="Projects"
            totalEntitesCount={props.totalProjects}
          />
          {Array.isArray(props.projects) && (
            <ul>
              {props.projects.map((project: Project, index: number) => (
                <li key={index}>
                  <EachProject project={project} showCompanyName={false} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default ClientProjectsUI
