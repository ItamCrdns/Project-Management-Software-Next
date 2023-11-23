// ? This will do a dropdown menu showing authors. Clicking on them will filter the <entity> by author

import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams } from 'next/navigation'

interface SelectAuthorProps {
  toggle: boolean
}

interface Params {
  client?: [string, string]
}

const SelectAuthor: React.FC<SelectAuthorProps> = (props) => {
  const { toggle } = props
  const params: Params = useParams()

  if (params.client === undefined) return null // ? Should never return null, but just in case

  const clientId = parseInt(params.client[0]) ?? 1

  const { employees } = getEmployeesThatHaveCreatedProjects(clientId, toggle)
  console.log(employees)

  return <div>SelectAuthor</div>
}

export default SelectAuthor
