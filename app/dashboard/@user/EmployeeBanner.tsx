import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
// import Link from 'next/link'

interface EmployeeBannerProps {
  employee: Employee
}

const EmployeeBanner: React.FunctionComponent<EmployeeBannerProps> = ({
  employee
}) => {
  return (
    <>
      <Image
        src={employee.profilePicture}
        alt={employee.username}
        width={50}
        height={50}
      />
      <h1>
        Welcome, <span>{employee?.username}</span>
      </h1>
    </>
  )
}

export default EmployeeBanner
