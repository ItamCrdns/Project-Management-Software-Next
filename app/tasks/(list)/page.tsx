import styles from '@/app/projects/(list)/projectslist.module.css'
import TitleWrapper from '@/components/Header title/TitleWrapper'
import Tasks from './Tasks'
import { type TasksProps } from './TaskProps'

const TasksPage: React.FC<TasksProps> = (props) => {
  return (
    <main className={styles.main}>
      <TitleWrapper
        title='Tasks overview'
        icon='note_stack'
        buttonText='New task'
        buttonHref='/tasks/new'
        buttonWidth='100px'
      />
      <section>
        <Tasks searchParams={props.searchParams} />
      </section>
    </main>
  )
}

export default TasksPage