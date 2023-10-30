import styles from '@/app/projects/(list)/projectslist.module.css'
import TitleWrapper from '@/components/Header title/TitleWrapper'

const TasksPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <TitleWrapper
        title="Tasks overview"
        icon="note_stack"
        buttonText="New task"
        buttonHref="/tasks/new"
        buttonWidth='100px'
        isTask
      />
    </main>
  )
}

export default TasksPage
