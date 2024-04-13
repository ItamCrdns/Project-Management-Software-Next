const LoadingEmployeeCard: React.FC = () => {
  return (
      <div
        role='status'
        className='animate-pulse'
      >
        <div className='h-[395px] w-[275px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      </div>
  )
}

export default LoadingEmployeeCard
