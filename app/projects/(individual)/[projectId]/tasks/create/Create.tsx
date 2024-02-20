import { type Project } from '@/interfaces/project'
import styles from './new-task.module.css'
import { DatePicker } from '@tremor/react'

const Create: React.FC<{ project: Project | undefined }> = (props) => {
  const { project } = props

  return (
    <section className={styles.newtaskwrapper}>
      <div className={styles.newtask}>
        <h1>Create new task for {project?.name}</h1>
        <DatePicker />
      </div>
    </section>
  )
}

export default Create
