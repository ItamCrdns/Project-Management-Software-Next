const LoadingEventSkeleton = () => {
  return (
    <div className='flex gap-8 animate-pulse m-8'>
      <div className='h-[300px] w-[207px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='space-y-8'>
        <div className='h-[125px] w-[318px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[160px] w-[318px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
    </div>
  )
}

export default LoadingEventSkeleton
