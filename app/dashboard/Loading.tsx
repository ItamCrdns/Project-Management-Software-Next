const Loading: React.FC = () => {
  return (
    <div className='flex items-center justify-between gap-4 p-4 shadow-md rounded-md min-w-96 bg-theming-white100 dark:bg-theming-dark300'>
      <span className='flex items-center gap-4'>
        <span className='h-6 w-6 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
        <h1 className='font-semibold'>Loading. Please wait...</h1>
      </span>
    </div>
  )
}

export default Loading
