import getProjectsShowcase from '@/api-calls/getProjectsShowcase'
import EachBanner, { type Item } from '../GenericBanner'
import { type Project } from '@/interfaces/project'

const Projects = async (): Promise<JSX.Element> => {
  const { data } = await getProjectsShowcase('1', '5')
  const projects = data?.data ?? []

  const projectsAsItem: Item[] = projects.map((project: Project) => ({
    id: project.projectId,
    name: project.name
  }))

  return (
    <EachBanner
      items={projectsAsItem}
      entityIcon="tactic"
      entityName="Projects"
    />
  )
}

export default Projects
