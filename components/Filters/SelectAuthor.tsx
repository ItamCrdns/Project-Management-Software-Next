// ? This will do a dropdown menu showing authors. Clicking on them will filter the <entity> by author

import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter
} from 'next/navigation'
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
  const router = useRouter()

  const onEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
    if (Array.isArray(selectedEmployees)) {
      const newURLSearchParams = new URLSearchParams()

      // * Iterate all the existing search params in the current URL (Dont worry will get em all)
      for (const [key, value] of Array.from(searchParams)) {
        // * Append them to a new URLSearchParams object and add the new search params to the URL.
        if (!searchParams.has(key)) {
          // * Avoid repeating the key (&author=1-2 instead of &author=1&author=1-2))
          newURLSearchParams.append(key, value)
        }
      }

      // * Save the selected employee Ids in an array
      const selectedEmployeesIDs = selectedEmployees?.map((e) => e.value)
      // * Join the array into a string. Example: 1-2-3-4
      const selectedEmployeesString = selectedEmployeesIDs?.join('-')

      // * Build the URL with all the selected employees
      const newUrl =
        selectedEmployeesString !== ''
          ? `${pathname}?${newURLSearchParams.toString()}&author=${selectedEmployeesString}`
          : `${pathname}?${newURLSearchParams.toString()}`

      router.replace(newUrl)
    }
    // * No else. We dont need to handle the case where the selected employee its not an array.
    // * It should always be an array (for this particular component!)
  }

  return (
    <CustomSelect
      options={employeesAsOptions(employees?.data)} // ? Make the employees fit the options interface
      text="Change project author"
      onSelect={onEmployeeSelect} // TODO: ADD AN ACTUAL FUNCTION THAT WILL ACTUALLY WORK
      isPaginated
      pageSize={employees?.pages}
      onPageChange={handlePageChange}
      defaultValue="" // TODO: Do I need to set this up? Yes! I do! Check if the URL has some Ids, and add them here.
      showPictures={props.showPictures}
      multiple={true} // ? This will allow multiple option selection
    />
  )
}

export default SelectAuthor
