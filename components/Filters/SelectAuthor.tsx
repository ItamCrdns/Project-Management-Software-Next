// ? This will do a dropdown menu showing authors. Clicking on them will filter the <entity> by author

import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams } from 'next/navigation'
import CustomSelect from '../select/select'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { type Option } from '@/interfaces/props/CustomSelectProps'

interface SelectAuthorProps {
  toggle: boolean
  showPictures?: boolean
}

interface Params {
  client?: [string, string]
}

const SelectAuthor: React.FC<SelectAuthorProps> = (props) => {
  const { toggle } = props
  const params: Params = useParams()

  if (params.client === undefined) return null // ? Should never return null, but just in case

  const clientId = parseInt(params.client[0]) ?? 1

  // TODO: Pagination. To make the application more scalable. I suggest pagination the results from the API
  // TODO: Will also need to use state management to re-render the component when the page changes
  // TODO: This will use a combination of state and query params to filter the results
  const queryParams: Partial<IFilterProperties> = {
    page: '1', // TODO: This one will most likely change. And PageSize will still be 5 all the time. Just change the page.
    pageSize: '5' // TODO: Change this default params. They should be gotten from the STATE. The URL is already being used for the projects page and pageSize
  }

  const { employees } = getEmployeesThatHaveCreatedProjects(
    clientId,
    toggle,
    queryParams
  )

  const employeesArray: Option[] = []

  // ? Translating the employees array to an array of options that the CustomSelect component can understand
  // TODO: Might create a generic method that can be used for all the entities, as of now this method its rewritten two times
  employees?.data.forEach((employee) => {
    const entityAsEmployee: Option = {
      value: employee.employeeId,
      label: employee.username,
      info: '', // ? We dont need this for the employee. And not specifying it will it undefined which I dont want so just empty string
      picture: employee.profilePicture
    }

    employeesArray.push(entityAsEmployee) // ? Push the employee to the array on each iteration
  })

  return (
    <>
      <CustomSelect
        options={employeesArray}
        text="employee"
        onSelect={() => {}} // TODO: ADD AN ACTUAL FUNCTION THAT WILL ACTUALLY WORK
        defaultValue="" // TODO: Still
        showPictures={props.showPictures}
      />
    </>
  )
}

export default SelectAuthor
