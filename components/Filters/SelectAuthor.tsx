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

  const [employeesFromUrl, setEmployeesFromUrl] = useState<number[]>([])

  useEffect(() => {
    if (searchParams.has('author')) {
      const authorIds = searchParams.get('author')?.split('-')
      const dontRepeatIds = Array.from(new Set(authorIds))
      const dontRepeatIdsNumber = dontRepeatIds.map((i) => parseInt(i))
      setEmployeesFromUrl(dontRepeatIdsNumber) // * Cet the selected employees for the URL
    } else {
      setEmployeesFromUrl([])
      setEmployeesPictures([])
    }
  }, [searchParams])

  const [selectedEmployeesIDs, setSelectedEmployeesIDs] =
    useState<number[]>(employeesFromUrl)

  const shouldFetch = employeesFromUrl.length !== 0

  const { employeesFromIds } = getEmployeesByIdsArray(
    employeesFromUrl,
    shouldFetch
  )

  const [employeesPictures, setEmployeesPictures] = useState<string[]>([])

  useEffect(() => {
    if (employeesFromIds !== undefined) {
      const pictures = employeesFromIds?.map((e) => e.profilePicture) ?? []
      setEmployeesPictures(pictures)
    }
  }, [employeesFromIds])

  const handleEmployeeSelect = (selectedEmployees: Option | Option[]): void => {
    if (Array.isArray(selectedEmployees)) {
      setSelectedEmployeesIDs(selectedEmployees?.map((e) => e.value))
    }
  }

  useEffect(() => {
    props.getAuthorsIDValues(selectedEmployeesIDs) // * Pass the selected employee Ids to the parent component
    const selectedEmployeesString = selectedEmployeesIDs?.join('-')

    searchParams.set('author', selectedEmployeesString)

    if (selectedEmployeesIDs.length === 0) {
      searchParams.delete('author')
    }

    const newUrl = `${pathname}?${searchParams?.toString()}`

    if (searchParams?.toString() !== undefined) {
      router.replace(newUrl)
    }
  }, [selectedEmployeesIDs])

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
      defaultSelectedOptions={employeesFromUrl.join('-')} // ? Will convert it to an array
      showPictures={props.showPictures}
      clearSelectedOptions={props.clearAuthorsIDValues}
      multiple={true} // ? This will allow multiple option selection
    />
  )
}

export default SelectAuthor
