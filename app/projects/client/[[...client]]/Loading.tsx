const Loading: React.FC<{ skeletonCount: number, width?: number }> = (props) => {
  const skeletonCount = isNaN(props.skeletonCount)
    ? 9
    : props.skeletonCount - 1 // * We subtract 1 because we already have one skeleton element before the loop

  const widthValue = props.width ?? 1500

  return (
    <div role='status' className='animate-pulse' style={{ width: widthValue + 'px' }}>
      <div className='h-[72px] bg-gray-200 rounded-md dark:bg-gray-700'></div>
      <div className='mt-8 h-[56px] bg-gray-200 rounded-md dark:bg-gray-700 mb-4'></div>
      {Array.from({ length: skeletonCount }).map((_, index) => {
        return (
          <div
            key={index}
            className='h-[56px] mb-4 bg-gray-200 rounded-md dark:bg-gray-700'
          ></div>
        )
      })}
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export { Loading }
