'use client'
import { NotFound } from '@/components/404 Not Found/NotFound'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'

const NoProjects: React.FC = () => {
  const { pathname } = useGetSearchParams()

  return (
    <NotFound
      text='No projects match your search criteria'
      buttonText='Clear filters'
      href={pathname}
    />
  )
}

export { NoProjects }
