import React from 'react'

const LoadingProjectsSkeleton: React.FC<{
  clientsSkeletonsCount: number
  projectsSkeletonsCount: number
}> = (props) => {
  const { clientsSkeletonsCount, projectsSkeletonsCount } = props

  const clientSkeletons = isNaN(clientsSkeletonsCount)
    ? 10
    : clientsSkeletonsCount

  const projectSkeletons = isNaN(projectsSkeletonsCount)
    ? 10
    : projectsSkeletonsCount

  return (
    <div
      role='status'
      className='animate-pulse flex flex-col'
      style={{ width: '1500px' }}
    >
      <div className='h-[72px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      {Array.from({ length: clientSkeletons }).map((_, index) => {
        return (
          <React.Fragment key={index}>
            <div
              key={index}
              className='flex items-center justify-between h-[76px]'
            >
              <div className='h-[28px] bg-gray-200 rounded-md dark:bg-gray-700 w-[200px]'></div>
              <div className='flex gap-4 items-center justify-center'>
                <div className='h-[28px] bg-gray-200 rounded-md dark:bg-gray-700 w-[150px]'></div>
                <div className='h-[28px] bg-gray-200 rounded-md dark:bg-gray-700 w-[200px]'></div>
              </div>
            </div>
            {Array.from({ length: projectSkeletons }).map((_, index) => {
              return (
                <div
                  key={index}
                  className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'
                ></div>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { LoadingProjectsSkeleton }
