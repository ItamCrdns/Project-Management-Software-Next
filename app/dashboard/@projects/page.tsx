import styles from './projects.module.css'
import Projects from './Projects'

const ProjectsPage = (): JSX.Element => {
  return (
    <article className={styles.project}>
      <h1>Current active projects</h1>
      <Projects />
    </article>
  )
}

export default ProjectsPage
