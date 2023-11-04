import EmployeeCard from '@/components/employeecard/EmployeeCard'
import getEmployee from '@/api-calls/getEmployee'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const EmployeeCardProfile: React.FC<UsernameParamsProps> = async (props) => {
  const { username } = props.params
  const data = await getEmployee(username)
  const employee = data?.data
  const supervisor = employee?.supervisor

  return (
    <EmployeeCard
      employee={employee}
      supervisor={supervisor}
      isProfile={true}
      redirectMe={false}
    />
  )
}

export default EmployeeCardProfile
