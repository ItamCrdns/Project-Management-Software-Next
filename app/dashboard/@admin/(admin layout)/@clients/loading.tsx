const LoadingClientsSkeleton = () => {
  return (
    <div className='animate-pulse w-[350px] h-[440px] bg-theming-white100 dark:bg-theming-dark300 p-8 my-8 rounded-md'>
      <h1 className='font-semibold mb-4'>Clients</h1>
      <div className='mt-4 h-[300px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className='mt-[22px] h-[40px] bg-gray-200 rounded-md dark:bg-gray-700'
          ></div>
        ))}
      </div>
    </div>
  )
}

export default LoadingClientsSkeleton
