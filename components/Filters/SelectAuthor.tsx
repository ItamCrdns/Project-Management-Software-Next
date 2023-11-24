// ? This will do a dropdown menu showing authors. Clicking on them will filter the <entity> by author

import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import CustomSelect from '../select/select'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { employeesAsOptions } from './employeesAsOptions'
import { useState } from 'react'
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

  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  const queryParams: Partial<IFilterProperties> = {
    page: currentPage,
    pageSize: '5'
  }

  const { employees } = getEmployeesThatHaveCreatedProjects(
    clientId,
    toggle,
    queryParams
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onEmployeeSelect = (selectedEmployee: Option): void => {
    const newURLSearchParams = new URLSearchParams()

    // * Iterate all the existing search params in the current URL (Dont worry will get em all)
    for (const [key, value] of Array.from(searchParams)) {
      // * Append them to a new URLSearchParams object and add the new search params to the URL.
      newURLSearchParams.append(key, value)
    }

    // ? This will build a full URL
    // * If the selected Employee its not equal to null (which should never be null)
    // TODO: Foreach and push &author for every selected employee
    // TODO: Will have to make the Custom Select component to be able to handle multiple items selection
    const newUrl =
      selectedEmployee !== null
        ? `${pathname}?${newURLSearchParams.toString()}&author=${
            selectedEmployee.value
          }`
        : `${pathname}?${newURLSearchParams.toString()}`

    console.log(newUrl)
  }

  return (
    <CustomSelect
      options={employeesAsOptions(employees?.data)} // ? Make the employees fit the options interface
      text="Change project author"
      onSelect={onEmployeeSelect} // TODO: ADD AN ACTUAL FUNCTION THAT WILL ACTUALLY WORK
      isPaginated
      pageSize={employees?.pages}
      onPageChange={handlePageChange}
      defaultValue="" // TODO: Still
      showPictures={props.showPictures}
      multiple={true} // ? This will allow multiple option selection
    />
  )
}

export default SelectAuthor
