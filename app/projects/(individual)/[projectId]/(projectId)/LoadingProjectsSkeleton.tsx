const LoadingProjectsSkeleton: React.FC = () => {
  return (
    <div role='status' className='animate-pulse flex items-start gap-8 mt-8'>
      <div className='flex flex-col gap-16'>
        <div className='h-[161px] w-[500px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[67px] w-[500px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[161px] w-[500px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='h-[60px] w-[300px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
        <div className='h-[60px] w-[300px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='h-[88px] w-[300px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
    </div>
  )
}

export { LoadingProjectsSkeleton }
