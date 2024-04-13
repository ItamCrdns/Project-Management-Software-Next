const LoadingProjectUISkeleton = (): React.ReactElement => {
  return (
    <div role='status' className='animate-pulse w-[400px] space-y-16'>
      <div className='h-[161px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[67px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='h-[67px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
    </div>
  )
}

export default LoadingProjectUISkeleton
