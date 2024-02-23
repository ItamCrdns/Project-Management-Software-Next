import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import EntityHeader from '../EntityHeader'
import LoadingFetch from '../_fetch loader/LoadingFetch'
import EachProject from '@/app/projects/(list)/EachProject'
import { type Project } from '@/interfaces/project'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import {
  type IFilter,
  type IFilterProperties
} from '@/interfaces/props/context props/IFilter'
import { projectSortValues } from '../../../../components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'

interface ProjectsProps {
  isLoading: boolean
  isError: unknown
  projects: SWRGetterReturn<Project> | undefined
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void // ? Prop drilling the updateEntity of the context but can also call it again down the component tree but meh
}

const ProjectsList: React.FC<ProjectsProps> = (props) => {
  const { isLoading, isError, projects } = props

  return (
    <section>
      <EntityHeader name='projects' />
      <div className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <DataHeader
          dashboard
          pushSearchParams={false}
          entity='projects'
          width='300px'
          updateFilter={props.updateFilter}
          sortValues={projectSortValues}
        />
        {isLoading && <LoadingFetch entityName='projects' />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(projects?.data) && (
          <ul>
            {projects?.data.map((project: Project, index: number) => (
              <li key={index}>
                <EachProject project={project} showCompanyName />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default ProjectsList
