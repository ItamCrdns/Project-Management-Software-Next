import getEmployee from '@/api-calls/getEmployee'
import { getEmployeeWorkload } from '@/api-calls/getEmployeeWorkload'
import EmployeeCard from '@/components/employeecard/EmployeeCard'

const EmployeeIdCard: React.FC<{ username: string }> = async (props) => {
  const employeeData = getEmployee(props.username)

  const workloadData = getEmployeeWorkload(props.username)

  const [{ data: employee, status: employeeStatus }, { data: workload }] =
    await Promise.all([employeeData, workloadData])

  if (employeeStatus !== 200 && employee === null) {
    return <div>Failed to load employee</div>
  }

  return (
    <EmployeeCard
      employee={employee}
      workload={workload}
      supervisor={employee?.supervisor}
      isProfile={true}
      redirectMe={false}
    />
  )
}

export default EmployeeIdCard
