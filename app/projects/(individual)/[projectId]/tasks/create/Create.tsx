import { type Project } from '@/interfaces/project'
import { DatePicker } from '@tremor/react'

const Create: React.FC<{ project: Project | undefined }> = (props) => {
  const { project } = props

  return (
    <section className='flex items-center justify-center py-8 px-0'>
      <div className='flex flex-col items-center justify-center p-8 rounded-md shadow-md bg-theming-white100 dark:text-theming-dark300'>
        <h1>Create new task for {project?.name}</h1>
        <DatePicker />
      </div>
    </section>
  )
}

export default Create
