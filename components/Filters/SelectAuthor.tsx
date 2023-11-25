import getEmployeesThatHaveCreatedProjects from '@/api-calls/getEmployeesThatHaveCreatedProjects'
import { useParams, usePathname, useRouter } from 'next/navigation'
import CustomSelect from '../select/select'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { employeesAsOptions } from './employeesAsOptions'
import { useEffect, useState } from 'react'
import { type IParams, type ISelectAuthorProps } from './SelectAuthorInterfaces'
import { setInitialSearchParams } from './setInitialSearchParams'
import { type Option } from '@/interfaces/props/CustomSelectProps'

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

  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  useEffect(() => {
    if (searchParams?.toString().includes('author') === true) {
      const authorIds = searchParams.get('author')?.split('-')
      const dontRepeatIds = Array.from(new Set(authorIds))
      setSelectedOptions(dontRepeatIds.map((id) => parseInt(id)))
    }
  }, [searchParams])

  const handleEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
    if (Array.isArray(selectedEmployees)) {
      // * Save the selected employee Ids in an array and join the array into a string. Example: 1-2-3-4
      // TODO: selectedEmployeesIDs gotten from the URL should be already selected in the filter. Currently, they are not (if we access directly from the URL)
      const selectedEmployeesIDs = selectedEmployees?.map((e) => e.value)
      const selectedEmployeesString = selectedEmployeesIDs?.join('-')

      if (searchParams?.toString().includes('author') === true) {
        searchParams.set('author', selectedEmployeesString) // ? Set, because author already exists in the URL
      } else if (searchParams?.toString().includes('author') === false) {
        searchParams.append('author', selectedEmployeesString) // ? Append, because author doesn't exist in the URL (yet!)
      }

      const newUrl = `${pathname}?${searchParams?.toString()}`

      if (searchParams?.toString() !== undefined) {
        router.push(newUrl)
      }
    }
  }

  return (
    <CustomSelect
      options={employeesAsOptions(employees?.data)} // ? Make the employees fit the options interface
      text="Change project author"
      onSelect={handleEmployeeSelect}
      isPaginated
      pageSize={employees?.pages}
      onPageChange={handlePageChange}
      defaultValue={selectedOptions.toString()} // TODO: This shows IDS, Make it so it shows... maybe names? profile pictures?
      showPictures={props.showPictures}
      multiple={true} // ? This will allow multiple option selection
    />
  )
}

export default SelectAuthor
