'use client'
import { Button } from '@/components/Button/Button'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'
import { Badge } from '@tremor/react'

const NoProjects: React.FC = () => {
  const { pathname } = useGetSearchParams()

  return (
    <div className='flex flex-col items-center gap-8'>
      <Badge>
        <h1 className='p-4'>No projects match your search criteria</h1>
      </Badge>
      <Button text='Clear filters' href={pathname} />
    </div>
  )
}

export { NoProjects }
