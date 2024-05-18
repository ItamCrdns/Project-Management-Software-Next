'use client'
import { PageFilters } from '@/components/Filters/PageFilters'
import { EmployeeTier } from '@/interfaces/EmployeeTier'
import { useSearchParams } from 'next/navigation'

const Filters: React.FC<{
  employeeTier: EmployeeTier | null
  clientId: string
}> = (props) => {
  const searchParams = useSearchParams()

  const employeesFromUrl = searchParams.get('author')?.split('-')

  const queryParams = new URLSearchParams({
    // ? Set page param in PageFilters.tsx
    employeeIds: employeesFromUrl?.join('-') ?? '',
    pageSize: '5'
  })

  const url = `${process.env.NEXT_PUBLIC_API_URL}Company/${props.clientId}/employees/by-projects-created`

  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <PageFilters
        url={url}
        queryParams={queryParams}
        employeeTier={props.employeeTier}
      />
    </div>
  )
}

export { Filters }
