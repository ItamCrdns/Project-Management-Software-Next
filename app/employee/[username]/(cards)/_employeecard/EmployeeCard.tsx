import getEmployee from '@/api-calls/getEmployee'
import EmployeeCard from '@/components/employeecard/EmployeeCard'

const EmployeeIdCard: React.FC<{ username: string }> = async (props) => {
  const data = await getEmployee(props.username)

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

export default EmployeeIdCard
