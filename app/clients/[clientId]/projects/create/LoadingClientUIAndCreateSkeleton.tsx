import React from 'react'

const LoadingClientUIAndCreateSkeleton = () => {
  return (
    <div role='status' className='animate-pulse flex items-start gap-8'>
      <div className='h-[72px] w-[400px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[438px] w-500 bg-gray-200 rounded-md dark:bg-gray-700'></div>
    </div>
  )
}

export default LoadingClientUIAndCreateSkeleton
