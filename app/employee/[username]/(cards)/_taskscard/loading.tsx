const LoadingTasks: React.FC = () => {
  return (
      <div
        role='status'
        className='animate-pulse'
      >
        <div className='h-[256px] w-[475px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
  )
}

export default LoadingTasks
