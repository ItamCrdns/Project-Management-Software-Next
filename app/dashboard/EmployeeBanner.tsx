import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from './dashboard.module.css'

/**
 * Displays a simple little banner with user profile picture, username and tier name.
 */
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
    </>
  )
}

export default EmployeeBanner
