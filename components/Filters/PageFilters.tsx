'use client'
import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'
import { SelectAuthor } from './SelectAuthor'
import { SelectPriority } from './SelectPriority'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import {
  getEmployeesForFilters,
  type EmployeeFetcherProps
} from './getEmployeesForFilters'
import { type IParams } from './SelectAuthorInterfaces'
import { employeesAsOptions } from './employeesAsOptions'
// import { type Employee } from '@/interfaces/employee'
// import { type DataCountPages } from '@/interfaces/DataCountPages.interface'

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const getPriorityValue = (priority: number): void => {
    if (priority === 0) return
    searchParams.set('priority', priority.toString())
    searchParams.set('pagesize', '10')

    if (searchParams.toString() !== undefined && priority !== 0) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const clearFilters = (): void => {
    searchParams.delete('author')
    searchParams.delete('priority')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)

    setSelectedPriority(null)
    setSelectedAuthors([])
  }

  const [activeDropdown, setActiveDropdown] = useState<string>('')

  const onShowDropdown = (dropdown: string): void => {
    // * If the dropdown is already active, reset it
    if (dropdown === activeDropdown) {
      setActiveDropdown('')
      return
    }

    setActiveDropdown(dropdown)
  }

  const authorIdFilterSet =
    searchParams.get('author') !== null &&
    searchParams.get('author')?.length !== 0
  const priorityFilterSet =
    searchParams.get('priority') !== null &&
    searchParams.get('priority') !== '0'

  // * Track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  const employeesFromUrl = searchParams.get('author')?.split('-')

  const [currentPage, setCurrentPage] = useState<number>(1)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const params: IParams = useParams()
  const employeeFetcherProps: EmployeeFetcherProps = {
    ids: employeesFromUrl,
    shouldFetch: true,
    clientId: Number(params.client?.[0]),
    page: currentPage.toString(),
    limit: '3'
  }

  const { selectedEmployees, allEmployees } =
    getEmployeesForFilters(employeeFetcherProps)

  // const [allEmployeesState, setAllEmployeesState] = useState<DataCountPages<Employee>>(allEmployees)

  // useEffect(() => {
  //   if (allEmployees !== undefined) {
  //     setAllEmployeesState(allEmployees)
  //   }
  // }, [allEmployees])

  const [selectedPriority, setSelectedPriority] = useState<Option | null>(null)
  const [selectedAuthors, setSelectedAuthors] = useState<Option[]>([]) // ? Authors to avoid name collision with employees

  useEffect(() => {
    if (Array.isArray(selectedEmployees) && selectedEmployees.length > 0) {
      setSelectedAuthors(employeesAsOptions(selectedEmployees))
    }
  }, [selectedEmployees])

  const selectAuthorProps = {
    shouldShowDropdown: activeDropdown === 'author',
    onShowDropdown: () => {
      onShowDropdown('author')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    },
    clearFilters,
    selectedAuthors,
    onEmployeeSelect: (employee: Option | Option[] | null): void => {
      if (!Array.isArray(employee) && employee !== null) {
        setSelectedAuthors((prev) => {
          if (prev.some((e) => e.value === employee.value)) {
            return prev?.filter((e) => e.value !== employee.value)
          }
          return [...prev, employee]
        })
      }
    },
    allEmployees,
    selectedEmployees,
    handlePageChange
  }

  const selectPriorityProps = {
    getPriorityValue,
    defaultValue: searchParams.get('priority') ?? '',
    shouldShowDropdown: activeDropdown === 'priority',
    onShowDropdown: () => {
      onShowDropdown('priority')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    },
    clearFilters,
    selectedPriority,
    onPrioritySelect: (priority: Option | Option[] | null): void => {
      if (!Array.isArray(priority) && priority !== null) {
        setSelectedPriority(priority)
      }
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <SelectAuthor {...selectAuthorProps} />
      <SelectPriority {...selectPriorityProps} />
      {filtersHaveBeenSet && (
        <div className='w-full'>
          <Button text='Clear all filters' func={clearFilters} />
        </div>
      )}
    </div>
  )
}

export { PageFilters }
