import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from '../dashboard.module.css'
// import Link from 'next/link'

interface EmployeeBannerProps {
  employee: Employee
}

const EmployeeBanner: React.FunctionComponent<EmployeeBannerProps> = ({
  employee
}) => {
  return (
    <>
      <div className={styles.bannerwrapper} style={{ minWidth: '400px' }}>
        <div>
          <Image
            src={employee.profilePicture}
            alt={employee.username}
            width={50}
            height={50}
          />
          <h1>
            Welcome, <span>{employee?.username}</span>
          </h1>
        </div>
        <div>
          <p style={{ fontSize: '12px' }}>{employee.tier.name}</p>
        </div>
      </div>
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

export default EmployeeBanner
