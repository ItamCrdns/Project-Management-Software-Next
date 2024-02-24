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
    <section className='space-y-4 mb-8'>
      <EntityHeader name='projects' />
      <div>
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
          <ul className='space-y-4 items-stretch'>
            {projects?.data.map((project: Project, index: number) => (
              <li
                className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                key={index}
              >
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
