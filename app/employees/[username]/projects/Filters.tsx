'use client'
import { PageFilters } from '@/components/Filters/PageFilters'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'
import { useParams } from 'next/navigation'

const Filters: React.FC = () => {
  const { searchParams } = useGetSearchParams()

  const params = useParams()

  const employeesFromUrl = searchParams.get('author')?.split('-')

  const queryParams = new URLSearchParams({
    // ? Set page param in PageFilters.tsx
    employeeiDS: employeesFromUrl?.join('-') ?? '',
    pageSize: '3'
  })

  const url = `${process.env.NEXT_PUBLIC_API_URL}Employee/${params.client?.[0]}/projects/created` // ! Invalid URL

  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <PageFilters url={url} queryParams={queryParams} />
    </div>
  )
}

export { Filters }
