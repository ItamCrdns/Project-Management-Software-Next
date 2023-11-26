import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams, usePathname, useRouter } from 'next/navigation'
import CustomSelect from '../select/select'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { employeesAsOptions } from './employeesAsOptions'
import { useEffect, useState } from 'react'
import { type IParams, type ISelectAuthorProps } from './SelectAuthorInterfaces'
import { setInitialSearchParams } from './setInitialSearchParams'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'

// * This will do a dropdown menu showing authors. Clicking on them will filter the <entity> by author

const SelectAuthor: React.FC<ISelectAuthorProps> = (props) => {
  const params: IParams = useParams()
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
    props.toggle,
    queryParams
  )

  const pathname = usePathname()
  const router = useRouter()

  const searchParams = setInitialSearchParams()

  const [selectedOptions, setSelectedOptions] = useState<string>('')

  useEffect(() => {
    if (searchParams?.toString().includes('author') === true) {
      const authorIds = searchParams.get('author')?.split('-')
      const dontRepeatIds = Array.from(new Set(authorIds))
      setSelectedOptions(dontRepeatIds.join('-')) // * Create a string with the selected employee Ids separated by a dash. Example: 1-2-3-4
    }
  }, [searchParams])

  // * Use the query params to get employees from the API. This will return only the employees that exist.
  // TODO: Find out which employee Ids have not been returned (if any). Those ids are invalid and should be removed from the URL

  // TODO: If its all, we will handle it differently. We will show all employees and not filter by author. Will do it later.
  const selectedOptionsHasValue = selectedOptions !== 'all'
  const { employeesFromIds } =
    getEmployeesByIdsArray(selectedOptions, selectedOptionsHasValue)

  // * Employees pictures. Gotten from the Ids on the URL. Send them to the select component to show them
  // ? Use an state to fix the "undefined" error when the employeesFromIds is not ready

  const [employeesPictures, setEmployeesPictures] = useState<string[]>([])
  useEffect(() => {
    if (employeesFromIds !== undefined) {
      const pictures = employeesFromIds?.map((e) => e.profilePicture)
      setEmployeesPictures(pictures)
    }
  }, [employeesFromIds])

  const handleEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
    if (Array.isArray(selectedEmployees)) {
      // * Save the selected employee Ids in an array and join the array into a string. Example: 1-2-3-4
      // TODO: selectedEmployeesIDs gotten from the URL should be already selected in the filter. Currently, they are not (if we access directly from the URL)
      const selectedEmployeesIDs = selectedEmployees?.map((e) => e.value)
      const selectedEmployeesString = selectedEmployeesIDs?.join('-')
      setSelectedOptions(selectedEmployeesString)

      if (searchParams?.toString().includes('author') === true) {
        searchParams.set(
          'author',
          selectedEmployeesString === '' ? 'all' : selectedEmployeesString // * If the string is empty, it means we want to show all employees
        ) // ? Set, because author already exists in the URL
      } else if (searchParams?.toString().includes('author') === false) {
        searchParams.append('author', selectedEmployeesString) // ? Append, because author doesn't exist in the URL (yet!)
      }

      const newUrl = `${pathname}?${searchParams?.toString()}`

      if (searchParams?.toString() !== undefined) {
        router.replace(newUrl)
      }
    }
  }

  return (
    <CustomSelect
      options={employeesAsOptions(employees?.data)} // ? Make the employees fit the options interface
      text="Select authors..."
      onSelect={handleEmployeeSelect}
      isPaginated
      pageSize={employees?.pages}
      onPageChange={handlePageChange}
      defaultValue={employeesPictures} // ? This will show the employees pictures on the select component default value. Only if they exist in the URL
      defaultEntities={employeesFromIds} // ! Will pass the employees object down to the select. Might not be the most generic way to do it, but I just want to get it done.
      defaultSelectedOptions={selectedOptions} // ? Will convert it to an array
      showPictures={props.showPictures}
      multiple={true} // ? This will allow multiple option selection
    />
  )
}

export default SelectAuthor
