const LoadingTasks: React.FC = () => {
  return (
    <div role='status' className='animate-pulse w-full'>
      <div className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'></div>
      <div className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'></div>
      <div className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'></div>
      <div className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'></div>
      <div className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
    </div>
  )
}

export default LoadingTasks
