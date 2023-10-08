import EmployeeCard from '@/components/employeecard/EmployeeCard'
import getEmployee from '@/api-calls/getEmployee'

const EmployeeCardProfile = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const { username } = params
  const data = await getEmployee(username)
  const employee = data?.data
  const supervisor = employee?.supervisor

  return <EmployeeCard employee={employee} supervisor={supervisor} />
}

export default EmployeeCardProfile
