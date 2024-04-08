import { Employee } from './Employee'

const EmployeeCardProfile: React.FC<{ params: { username: string } }> = (
  props
) => {
  const { username } = props.params

  return <Employee username={username} />
}

export default EmployeeCardProfile
