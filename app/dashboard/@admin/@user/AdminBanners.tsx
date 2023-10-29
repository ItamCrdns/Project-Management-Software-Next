import styles from '@/app/dashboard/dashboard.module.css'

const AdminBanners: React.FC = () => {
  return (
    <>
      <div className={styles.bannerwrapper}>
        <div className={styles.newprojects}>
          <div>
            <h1>New projects</h1>
            <p>8 this week</p>
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
        <div className={styles.newprojects}>
          <div>
            <h1>New tasks</h1>
            <p>82 this week</p>
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
        <div className={styles.newprojects}>
          <div>
            <h1>New issues</h1>
            <p>135 this week</p>
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
