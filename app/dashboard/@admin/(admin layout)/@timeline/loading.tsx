const LoadingTimelineSkeleton = () => {
  return (
    <div className='animate-pulse w-[500px] h-[890px] bg-theming-white100 dark:bg-theming-dark300 p-8 my-8 rounded-md'>
      <h1 className='font-semibold mb-4'>Activity Timeline</h1>
      <div className='mt-4 h-[750px]'>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <div
              key={index}
              className='mt-[34px] h-[40px] bg-gray-200 rounded-md dark:bg-gray-700'
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default LoadingTimelineSkeleton
