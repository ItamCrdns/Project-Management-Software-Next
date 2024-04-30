const LoadingTeamSkeleton: React.FC<{ count: number }> = (props) => {
  const eachEmployeeHeight: number = props.count * 68 + 64

  return (
    <div role='status' className='animate-pulse w-[1564px]'>
      <div className='h-[72px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div
        className={'mt-8 bg-gray-200 rounded-md dark:bg-gray-700 mb-4'}
        style={{ height: eachEmployeeHeight + 'px' }}
      ></div>
    </div>
  )
}

export { LoadingTeamSkeleton }
