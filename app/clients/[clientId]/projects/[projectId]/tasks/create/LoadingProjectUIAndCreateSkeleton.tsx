const LoadingProjectUIAndCreateSkeleton: React.FC = () => {
  return (
    <div role='status' className='animate-pulse flex items-start gap-8'>
      <div className='space-y-16'>
        <div className='h-[161px] w-[400px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[67px] w-[400px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[67px] w-[400px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
      <div className='h-[438px] w-500 bg-gray-200 rounded-md dark:bg-gray-700'></div>
    </div>
  )
}

export default LoadingProjectUIAndCreateSkeleton
