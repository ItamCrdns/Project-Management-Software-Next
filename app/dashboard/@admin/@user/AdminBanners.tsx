import styles from '@/app/dashboard/dashboard.module.css'
import getEntitiesCreatedLastWeek from '@/api-calls/getEntitiesCreatedLastWeek'

const AdminBanners: React.FC = async () => {
  const { data } = await getEntitiesCreatedLastWeek()

  const projectsLastWeek = data?.projectsLastWeek
  const tasksLastWeek = data?.tasksLastWeek
  const issuesLastWeek = data?.issuesLastWeek

  return (
    <>
      <div className={styles.bannerwrapper}>
        <div className={styles.latestweekcount}>
          <div>
            <h1>New projects</h1>
            <p>{projectsLastWeek} this week</p>
          </div>
          <span
            style={{ color: 'white', backgroundColor: '#00A9FF' }}
            className="material-symbols-outlined"
          >
            emoji_objects
          </span>
        </div>
      </div>
      <div className={styles.bannerwrapper}>
        <div className={styles.latestweekcount}>
          <div>
            <h1>New tasks</h1>
            <p>{tasksLastWeek} this week</p>
          </div>
          <span
            style={{ color: 'white', backgroundColor: '#1A5D1A' }}
            className="material-symbols-outlined"
          >
            note_stack
          </span>
        </div>
      </div>
      <div className={styles.bannerwrapper}>
        <div className={styles.latestweekcount}>
          <div>
            <h1>New issues</h1>
            <p>{issuesLastWeek} this week</p>
          </div>
          <span
            style={{ color: 'white', backgroundColor: '#FF6969' }}
            className="material-symbols-outlined"
          >
            campaign
          </span>
        </div>
      </div>
    </>
  )
}

export default AdminBanners
