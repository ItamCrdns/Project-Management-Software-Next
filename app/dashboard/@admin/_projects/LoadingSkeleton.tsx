const LoadingSkeleton: React.FC<{ skeletonCount: number }> = (props) => {
  const skeletonCount = isNaN(props.skeletonCount) ? 5 : props.skeletonCount

  const skeletonArray = Array.from({ length: skeletonCount })

  return (
    <div role='status' className='animate-pulse w-[1800px]'>
      {skeletonArray.map((_, index) => {
        if (index === skeletonArray.length - 1) {
          // * Remove the margin bottom from the last element
          return (
            <div
              key={index}
              className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700'
            ></div>
          )
        } else {
          return (
            <div
              key={index}
              className='h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'
            ></div>
          )
        }
      })}
    </div>
  )
}

export default LoadingSkeleton
