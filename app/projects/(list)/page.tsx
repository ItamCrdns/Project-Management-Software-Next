import { Projects } from './Projects'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

const ProjectsPage: React.FC<{ searchParams: SearchParamsPageSize }> = async (props) => {
  return (
      <main className='flex flex-col justify-center gap-8 rounded-md p-8'>
        <h1 className='text-2xl'>Projects overview</h1>
        <Projects searchParams={props.searchParams} />
      </main>
  )
}

export default ProjectsPage
