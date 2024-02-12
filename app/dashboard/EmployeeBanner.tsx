import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import styles from './dashboard.module.css'
import NoPicture from '@/components/No profile picture/NoPicture'

/**
 * Displays a simple little banner with user profile picture, username and tier name. For both employee and admin.
 */
interface EmployeeBannerProps {
  employee: Employee
}

const EmployeeBanner: React.FC<EmployeeBannerProps> = ({ employee }) => {
  return (
    <>
      <div className={styles.bannerwrapper} style={{ minWidth: '400px' }}>
        <div>
          {employee.profilePicture !== null
            ? (
            <Image
              src={employee.profilePicture}
              alt={employee.username}
              width={50}
              height={50}
            />
              )
            : (
            <NoPicture width='50px' height='50px' questionMarkSize='1.75rem' />
              )}
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
